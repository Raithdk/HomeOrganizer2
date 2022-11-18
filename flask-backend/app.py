from flask import Flask, request, jsonify
import json as JSON
from flask_cors import CORS
from recipe import valdemarsroRecipeExtractor as vre
from recipe import recipefilehandler as jsfh


app = Flask(__name__)
CORS(app)


@app.route('/')
def hello_world():
    return 'This is my first API call!'


@app.route('/addRecipe', methods=["POST"])
def postRecipe():
    input_json = request.get_json(force=True)
    recipeUrl =  input_json['url']

    return jsonify(vre.writeValdemarsroRecipeJson(recipeUrl['recipeUrl']))

@app.route('/getRecipe')
def getRecipe():
    recipeName = request.args.get('recipeName')
    recipeData = jsfh.loadRecipe(recipeName)
    if 'err' in recipeData:
        return recipeData, 404
    return recipeData, 200

@app.route('/getRecipes', methods=["GET"])
def getRecipes():
    searchKeyword = request.args.get('keyword')
    result = vre.searchValdemarsro(searchKeyword)

    return jsonify(result)


