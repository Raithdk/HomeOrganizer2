import requests
from bs4 import BeautifulSoup
import json
import os
from os.path import exists

recipe404 = "Recipe Could not be found"
def writeValdemarsroRecipeJson(url):

    if not "valdemarsro" in url:
        raise Exception("URL invalid")
    try:
        r = requests.get(url)
    except requests.exceptions.RequestException as e:
        raise print(e)
    recipe = {}

    soup = BeautifulSoup(r.content, 'html.parser')

    recipe["headline"] = soup.find("h1", itemprop="headline").text
    recipe["url"] = url

    recipe_stats = {}
    stats_soup = soup.find_all("div", class_="recipe-stat")

    for stat in stats_soup:
        recipe_stats[stat.find_next(class_="recipe-stat-label").text] = stat.find_next("strong").text

    recipe["stats"] = recipe_stats

    ingredientSoup = soup.find("ul", class_="ingredientlist")

    # Iterate through all text in "ingredients liste"
    ingredientList = []
    recipePart = "Hovedret"
    recipePartDict = {}
    for item in ingredientSoup:
        if 'class' in item.attrs:
            # If new ingredient header found
            if 'ingredient-header' in item.attrs['class']:

                if len(ingredientList) > 0:
                    recipePartDict[recipePart] = ingredientList.copy()
                    recipePart = item.text

                ingredientList.clear()
        elif 'itemprop' in item.attrs:
            ingredientList.append(item.text)

    recipePartDict[recipePart] = ingredientList.copy()
    recipe["ingredients"] = recipePartDict
    methodSoup = soup.find("div", itemprop="recipeInstructions")

    methodLine = []
    for line in methodSoup.find_all("p"):
        methodLine.append(line.text)

    recipe["method"] = methodLine

    json_directory = os.path.dirname(__file__) + "/recipesJson/" #"/../recipesJson/"
    path_json = json_directory + str(recipe["headline"]).lower() + ".json"

    with open(path_json, "w") as outfile:
        json.dump(recipe, outfile, ensure_ascii=False, indent=4)

    return recipe


def loadRecipe(name):
    json_directory = os.path.dirname(__file__) + "/../recipesJson/"
    path_json = json_directory + str(name).lower() + ".json"
    json_file = None

    if exists(path_json):
        with open(path_json) as file:
            json_file = json.load(file)
    if json_file is None:
        json_file = {"headline": "The Recipe: " + name + " could not be found"}

    return json_file
