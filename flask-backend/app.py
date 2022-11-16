from flask import Flask, request, jsonify
import json as JSON
from flask_cors import CORS
import valdemarsroRecipeExtractor

app = Flask(__name__)
CORS(app)


@app.route('/')
def hello_world():
    return 'This is my first API call!'


@app.route('/post', methods=["POST"])
def postTest():
    input_json = request.get_json(force=True)
    recipeUrl =  input_json['url']
    
    
    return jsonify(valdemarsroRecipeExtractor.writeValdemarsroRecipeJson(recipeUrl['recipeUrl']))