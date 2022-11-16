from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.route('/')
def hello_world():
    return 'This is my first API call!'


@app.route('/post', methods=["POST"])
def postTest():
    input_json = request.get_json(force=True)
    dictToReturn = {'text':input_json['url']}
    return jsonify(dictToReturn)