import requests
from bs4 import BeautifulSoup
import json
import os
from os.path import exists
from jsonfilehandler import writeRecipe

recipe404 = "Recipe Could not be found"

## Should be put in an ENV file
recipeJsonDirectory = "/recipesJson/" #"/../recipesJson/"

#
# Method for taking a recipe from valdemarsro website and converting it a json file and putting it in the designated recipeJsonDirectory
#
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

    writeRecipe(recipe)
    
    return recipe

# TODO : Implement valdemarsro search (Can use their own search hehe)

