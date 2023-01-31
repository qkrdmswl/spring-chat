import json
import boto3
import os
from dotenv import load_dotenv


class sqsReceiver:

    load_dotenv()

    def __init__(self):
        self.client = boto3.client('sqs',
                                   aws_access_key_id=os.getenv('AWS_SECRET_ACCESS_ID'),
                                   aws_secret_access_key=os.getenv('AWS_SECRET_ACCESS_KEY'),
                                   region_name="us-east-2")
        self.url = os.getenv('NLP_QUEUE_URL')


    def receive(self):
        response = self.client.receive_message(
            QueueUrl=os.getenv('NLP_QUEUE_URL'),
            MaxNumberOfMessages=1
        )

        print(response)

        if response.get('Messages') != None:
            print('detected message!')

            message = response['Messages'][0]
            receipt_handle = message['ReceiptHandle']

            data_list = []
            for message in response.get('Messages'):
                body = json.loads(message.get('Body'))
                data = []
                data.append(body['ocrText'])
                data.append(body['imageIdx'])
                data_list.append(data)

            # delete messageId
            self.client.delete_message(
                QueueUrl=os.getenv('NLP_QUEUE_URL'),
                ReceiptHandle=receipt_handle
            )

            print(data_list)
            return data_list

        print('get out receiver..')
        return None