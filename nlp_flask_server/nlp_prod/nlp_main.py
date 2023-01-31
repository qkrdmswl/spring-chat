import re
import nltk
from flair.data import Sentence
from flair.models import SequenceTagger
from .nlp_init import NlpInit
import time
from .method import SIFRank


class NlpProcessor():
    def __init__(self, text='', init=''):
        self.text = text
        self.nlp_processor = nltk
        self.init = init
        self.time = []
        self.rex = []
        self.url = []
        self.recognized_words = []
        self.filteringwords = ["'s"]
        self.nertag = {}

    def post_processing(self):
        self.rex += re.compile(r"\d{1,2}[:]\d{1,2}|\d{1,2}[/]\d{1,2}|\d{3}[-]\d{4}[-]\d{4}").findall(self.text)
        iterator = re.finditer('(http|ftp|https)://([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?',
                               self.text)
        for i in iterator:
            self.url.append(i.group())

        for i in self.NER():
            if i[1] != 'CARDINAL' and i[0] not in self.filteringwords + self.recognized_words:
                self.recognized_words.append(i[0])
                self.nertag[i[0].lower()] = i[1]
            if len(i[0].split()) > 1 and i[1] not in ['DATE', 'TIME', 'DATETIME', 'CARDINAL', 'QUANTITY', 'PERCENT',
                                                      'MONEY', 'GPE', 'ORG']:
                self.recognized_words.extend(i[0].split())
                for j in i[0].split():
                    self.nertag[j.lower()] = i[1]

        # exception = ["o'clock"]
        word_tokens = nltk.word_tokenize(self.text)
        # print(self.text)
        correct_tokens = []
        filtered_tokens = []
        result = []
        n = nltk.stem.WordNetLemmatizer()
        s = nltk.stem.LancasterStemmer()
        # spell = self.init.spellchecker
        for i in word_tokens:
            # 2글자 이하인 단어중 불용어가 아니라면 필터링
            if i.isdigit() == False and len(i) < 3 and i not in nltk.corpus.stopwords.words('english'):
                continue
            # 고유명사라면 필터링 하지 않음
            elif i in ' '.join(self.recognized_words):
                correct_tokens.append(i)
            # 일반 명사인 경우 오타 수정후 추가
            # elif i in ' '.join(exception):
            #     correct_tokens.append(i)
            else:
                # correct_tokens.append(spell.correction(i))
                correct_tokens.append(i)  # 오타 수정 안함
        self.text = ' '.join(correct_tokens)


    # 태그 추출하는 메소드
    def NLP_Noun(self, score=False, ner=True):
        cleaned_content = re.sub(r'[^\.\?\!\'\w\d\s]', '', self.text)
        # print(cleaned_content)

        sortedscores = self.SIFRankScore()
        # print(sortedscores)
        if score == False:
            rankedtag = [i[0] for i in sortedscores]
            NNPwords = set([])
            cnt = 0
            # NER로 추출한 고유명사 리스트 결합
            for i in self.recognized_words:
                if i.lower() not in rankedtag + self.rex + self.url:
                    NNPwords.add(i.lower())
            #     #날짜 태그 처리 (to-do)
            #     if i[1] == 'DATE' or i[1] == 'TIME' or i[1] == 'DATETIME':
            #         self.append_tag(i[0],i[1])
            result = rankedtag
            if ner == True:
                result = result + list(NNPwords) + self.rex + self.url
            return result
        else:
            rankedtag = [i[0] for i in sortedscores]
            NNPwords = set([])
            temptuple = []
            cnt = 0
            # NER로 추출한 고유명사 리스트 결합
            for i in self.recognized_words:
                if i.lower() not in rankedtag + self.rex + self.url:
                    NNPwords.add(i.lower())
            for i in list(NNPwords):
                temptuple.append((i, self.nertag[i]))
            for i in self.rex:
                if (re.match(r'\d{1,2}[:]\d{1,2}', i)):
                    temptuple.append((i, 'TIME'))
                if (re.match(r'\d{1,2}[/]\d{1,2}', i)):
                    temptuple.append((i, 'DATE'))
                if (re.match(r'\d{3}[-]\d{4}[-]\d{4}', i)):
                    temptuple.append((i, 'PHONE'))
            for i in self.url:
                temptuple.append((i, 'URL'))
            if ner == True:
                result = sortedscores + temptuple
            else:
                result = sortedscores
            return result

    def SIFRankScore(self):
        keyphrases = SIFRank(self.text, self.init.SIF, self.init.en_model, N=15,
                             elmo_layers_weight=self.init.elmo_layers_weight)
        # keyphrases_ = SIFRank_plus(self.text, self.init.SIF, self.init.en_model, N=15, elmo_layers_weight=self.init.elmo_layers_weight)
        return keyphrases
        # print(keyphrases_)

    def NER(self):
        recognized_words = []
        # load tagger (default: ner)
        # 18개의 클래스로 분류하는 모델 이용
        tagger = self.init.tagger
        sentence = Sentence(self.text)
        tagger.predict(sentence)

        prevtag, nowtag = '', ''
        prevlabel, nowlabel = '', ''
        prevspan, nowspan = [0], [0]

        # 반환 결과를 단어와 개체명으로 구성된 튜플로 변환
        for entity in sentence.get_spans('ner'):
            t = str(entity)
            nowtag = re.compile(r"\"(.+)\"").search(t).group(1)
            nowlabel = re.compile(r"→\s(\w+)").search(t).group(1)
            nowspan = eval(re.compile(r"Span(\S+:\S+):").search(t).group(1).replace(':', ','))
            if nowspan[0] == prevspan[-1] + 1 and prevlabel == 'DATE' and nowlabel == 'TIME':
                recognized_words.append((prevtag + ' ' + nowtag, 'DATETIME'))
                recognized_words.remove((prevtag, prevlabel))
            else:
                recognized_words.append((nowtag, nowlabel))
            prevtag = nowtag
            prevlabel = nowlabel
            prevspan = nowspan
        for i in range(len(recognized_words)):
            if recognized_words[i][0].endswith("'s"):
                recognized_words[i] = list(recognized_words[i])
                recognized_words[i][0] = recognized_words[i][0][:-2]
                recognized_words[i][0] = recognized_words[i][0].strip()
                recognized_words[i] = tuple(recognized_words[i])
        return recognized_words

    def NER_train(self):
        recognized_words = []
        model = SequenceTagger.load("models/final-model.pt")
        sentence = Sentence(self.text)
        model.predict(sentence)

        # 반환 결과를 단어와 개체명으로 구성된 튜플로 변환
        for entity in sentence.get_spans('ner'):
            recognized_words.append((str(entity).split('\"')[1], str(entity).split('Labels: ')[1].split()[0]))
        return recognized_words

    def NER_str(self, s=''):
        recognized_words = []
        # load tagger (default: ner)
        # 18개의 클래스로 분류하는 모델 이용
        tagger = self.init.tagger
        sentence = Sentence(s)
        tagger.predict(sentence)
        # 반환 결과를 단어와 개체명으로 구성된 튜플로 변환
        for entity in sentence.get_spans('ner'):
            recognized_words.append((str(entity).split('\"')[1], str(entity).split('Labels: ')[1].split()[0]))
        return