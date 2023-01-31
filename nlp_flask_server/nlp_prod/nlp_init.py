import re
import nltk
import gensim
from flair.models import SequenceTagger
from symspellpy import SymSpell, Verbosity
import pkg_resources
from math import log10
import pymysql
import json
import time
from .sent_emb_sif import *
from .word_emb_elmo import *
from .method import SIFRank, SIFRank_plus
from stanfordcorenlp import StanfordCoreNLP

nltk.download('omw-1.4')
nltk.download('gutenberg')
nltk.download('brown')
nltk.download('punkt')
nltk.download('stopwords')
nltk.download('averaged_perceptron_tagger')
nltk.download('wordnet')

class NlpInit():
    def __init__(self) -> object:
        # with open('config.json') as f:
        #     config = json.load(f)
        # self.conn = pymysql.connect(host=config['host'], port = config['port'], user= config['user'],passwd= config['passwd'], db=config['db'], charset =config['charset'])
        # self.cur = self.conn.cursor(pymysql.cursors.DictCursor)
        # self.spellchecker = self.SpellChecker()
        # self.w2vmodel = gensim.models.KeyedVectors.load_word2vec_format('GoogleNews-vectors-negative300.bin',binary=True, limit=200000)
        self.tagger = SequenceTagger.load("pytorch_model.bin")
        # self.corpus=nltk.corpus.gutenberg.raw()+' '.join(nltk.corpus.brown.words())
        self.exception = []
        # self.sptext = self.corpus.lower().split() + self.exception + ' '.join(self.selectdb("where ischecked = 1 and iswrong = 0 and lang='eng'")).lower().split()
        # self.sptext = list(set(self.sptext))
        # self.sptext.sort()
        # self.wrongtokens = self.selectdb()
        self.options_file = "./elmo_2x4096_512_2048cnn_2xhighway_options.json"
        self.weight_file = "./elmo_2x4096_512_2048cnn_2xhighway_weights.hdf5"
        self.porter = nltk.PorterStemmer()
        self.ELMO = word_emb_elmo.WordEmbeddings(self.options_file, self.weight_file, cuda_device=0)
        self.SIF = sent_emb_sif.SentEmbeddings(self.ELMO, lamda=1.0)
        self.en_model = StanfordCoreNLP(r'stanford-corenlp-full-2018-02-27',
                                        quiet=True)  # download from https://stanfordnlp.github.io/CoreNLP/
        self.elmo_layers_weight = [0.0, 1.0, 0.0]