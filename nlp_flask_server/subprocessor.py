from sqs_prod.sqs_sender import sqsSender
from sqs_prod.sqs_receiver import sqsReceiver
from nlp_prod.nlp_main import NlpProcessor
from nlp_prod.nlp_init import NlpInit
from config.db import dev_db, prod_db
import argparse




class subprocessor():

    def __init__(self, model, db):
        self.model = model
        self.sqsSender = sqsSender()
        self.sqsReceiver = sqsReceiver()
        self.db = db

    def save_tag(self, ocrText, imageIdx):
        try:
            nlp_status = self.db.get_nlp_status(imageIdx)
            print("****", nlp_status)
        except Exception as e:
            print(e)
            return False

        if nlp_status == 0:
            processor = NlpProcessor(ocrText, self.model)
            print("**made processor")
            processor.post_processing()
            tag_list = processor.NLP_Noun(score=True, ner=True)
            print(tag_list)
            tags = []
            for i in range(len(tag_list)):
                tags.append([imageIdx, tag_list[i][0], 1])

            print(tags)
            self.db.insert_tag(tags)
            print("**insert tag")
            self.db.commit()
            self.db.change_status(imageIdx)
            print("**change_status to 1")
            self.db.commit()
            print("**commit done")



    def process(self):
        print("**start process...")
        while True:
            print('**new try!!!')
            response = self.sqsReceiver.receive()

            if response == None:
                print("**no response")
                continue

            for data in response:
                if self.save_tag(data[0], data[1]):
                    print("**saving tags...")
                    self.sqsSender.push(data[1])
                    print("**push")


# custom execute command
parser = argparse.ArgumentParser()
parser.add_argument('--exec', type=str, default='dev')
args = parser.parse_args()


# divide prod, dev DB
if args.exec == 'prod':
    db = prod_db()
else:
    print("**start dev server...")
    db = dev_db()


# start the process
model = NlpInit()
print(model)
processor = subprocessor(model, db)
processor.process()