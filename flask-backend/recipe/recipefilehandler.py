import json
import os
from os.path import exists

## Should be put in an ENV file
recipeJsonDirectory = "/recipesJson/" #"/../recipesJson/"

def loadRecipe(name):
    json_directory = os.path.dirname(__file__) + recipeJsonDirectory
    path_json = json_directory + str(name).lower() + ".json"
    json_file = None

    if exists(path_json):
        with open(path_json) as file:
            json_file = json.load(file)
    if json_file is None:
        json_file = {'err': "The Recipe: \"" + name + "\" could not be found"}

    return json_file

def writeRecipe(recipe):
    #TODO : Correct formatting of headline (" " -> "-")
    headline = recipe['headline'].lower()
    json_directory = os.path.dirname(__file__) + recipeJsonDirectory
    path_json = json_directory + str(headline) + ".json"

    with open(path_json, "w") as outfile:
        json.dump(recipe, outfile, ensure_ascii=False, indent=4)
    
    return

