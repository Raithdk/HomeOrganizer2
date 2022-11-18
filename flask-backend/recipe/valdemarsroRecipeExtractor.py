import requests
from bs4 import BeautifulSoup
from recipe.recipefilehandler import writeRecipe

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

    ## TODO : Save the order found

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

# Amount allows the user to choose how many results they want to get. 
def searchValdemarsro(keyword, amount = 5):
    url = 'https://www.valdemarsro.dk/soeg/?terms=&terms2=&q=' + keyword
    try:
        r = requests.get(url)
    except requests.exceptions.RequestException as e:
        raise print(e)

    searchResults = []
    soup = BeautifulSoup(r.content, 'html.parser')

    for item in soup.find_all(class_="post-list-item-title")[:amount]:
        input = {}
        content = item.find_next(class_='post-list-item-title').find_next('a')
        picture = item.find_next('img')

        input['name'] = content.text
        input['url'] = content['href']
        input['picUrl'] = picture['src']
        
        searchResults.append(input)
 
    return searchResults
