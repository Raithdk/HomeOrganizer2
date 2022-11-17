from flask import Flask, request, jsonify
import json as JSON
from flask_cors import CORS
import valdemarsroRecipeExtractor

app = Flask(__name__)
CORS(app)


@app.route('/')
def hello_world():
    return 'This is my first API call!'


@app.route('/recipe', methods=["POST"])
def postRecipe():
    input_json = request.get_json(force=True)
    recipeUrl =  input_json['url']
    
    return jsonify(valdemarsroRecipeExtractor.writeValdemarsroRecipeJson(recipeUrl['recipeUrl']))

@app.route('/getRecipe')
def getRecipe():
    recipeName = request.args.get('recipeName')
    recipeData = valdemarsroRecipeExtractor.loadRecipe(recipeName)
    if 'err' in recipeData:
        return recipeData, 404
    return recipeData, 200
    