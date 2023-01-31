from flask import Flask
from nlp_prod.nlp_init import NlpInit
from config.config import Config
from controllers.tagController import *

app = Flask(__name__)

model = None
messenger = None
sqs_sender = None
sqs_receiver = None


def load_model():
    global model
    model = NlpInit()


def register_blueprints(app):
    print("Registering Flask Blueprints.")
    app.register_blueprint(tagController)

    return app


def create_app():
    app = Flask(__name__)

    #config
    app.config.from_object(Config)

    load_model()
    register_blueprints(app)  # Registering blueprints to Flask App

    return app


