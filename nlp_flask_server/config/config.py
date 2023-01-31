import os
from dotenv import load_dotenv

load_dotenv(verbose=True)

class Config(object):
    ENV = os.getenv('FLASK_ENV')
    SECRET_KEY = os.getenv('SECRET_KEY')
