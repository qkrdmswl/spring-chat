from api import create_app

# @api.route('/image/now')
# class CreateTag(Resource):
#     def post(self):
#         ocrText = request.json.get("ocrText", None)
#
#         try:
#             print("try get_tags")
#             tags = get_tags(ocrText, init)  # utils.py
#             print("0")
#             return {'success': True,
#                     'tags': tags
#             }
#         except Exception as e:
#             print(e)
#             return {'success': False}
#
#
if __name__ == "__main__":
    app = create_app()
    app.run(debug=True, host='0.0.0.0', port=5000)