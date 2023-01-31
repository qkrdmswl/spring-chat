import os
import boto3
import json
from dotenv import load_dotenv

class sqsSender:

    load_dotenv()

    def __init__(self):
        self.client = boto3.client('sqs',
                                   aws_access_key_id=os.getenv('AWS_SECRET_ACCESS_ID'),
                                   aws_secret_access_key=os.getenv('AWS_SECRET_ACCESS_KEY'),
                                   region_name="us-east-2")
        self.url = os.getenv('PUSH_QUEUE_URL')


    def push(self, image_idx):
        message = {"imageIdx": image_idx}
        response = self.client.send_message(
            QueueUrl=os.getenv('PUSH_QUEUE_URL'),
            MessageBody=json.dumps(message)
        )

        print(response['MessageId'])