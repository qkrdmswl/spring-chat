from sqs_prod.sqs_sender import sqsSender
from sqs_prod.sqs_receiver import sqsReceiver
from nlp_prod.nlp_main import NlpProcessor
from api import model
from config.db import dev_db, prod_db
import argparse



class subprocessor():

    def __init__(self, model, db):
        self.model = model
        self.sqsSender = sqsSender()
        self.sqsReceiver = sqsReceiver()
        self.db = db

    def save_tag(self, model, ocrText, imageIdx):
        try:
            nlp_status = db.get_nlp_status(imageIdx)
        except Exception as e:
            print(e)
            return False

        if nlp_status == 0:
            processor = NlpProcessor(ocrText, model)
            tag_list = processor.NLP_Noun(score=True, ner=True)

            tags = []
            for i in range(len(tag_list)):
                tags.append([imageIdx, tag_list[i][0], 1])

            db.insert_tag(tags)
            db.commit()



    def process(self):
        while True:
            print('new try!!!')
            response = sqsReceiver.receive()

            if response == None:
                continue

            for data in response:
                if self.save_tag(model, data[0], data[1]):
                    sqsSender.push(data[1])



# custom execute command
parser = argparse.ArgumentParser()
parser.add_argument('--exec', type=str, default='dev')
args = parser.parse_args()


# divide prod, dev DB
if args.exec == 'prod':
    db = prod_db()
else:
    db = dev_db()


# start the process
processor = subprocessor(model, db)
processor.process()