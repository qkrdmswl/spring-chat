from flask import Blueprint, request
from api import model
from api.services.tagService import get_tags

tagController = Blueprint("image", __name__, url_prefix="/image")


@tagController.route("/now", methods=["POST"])
def extract_now():
    ocrText = request.json.get('ocrText')

    try:
        tags = get_tags(ocrText, model)

        return {
            'success': True,
            'tags': tags
        }
    except Exception as e:
        return {
            'success': False
        }