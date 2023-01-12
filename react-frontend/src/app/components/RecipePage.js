
import React, { useState } from "react";
import {Button, Form, InputGroup } from "react-bootstrap";
import Recipe from './/Recipe'
import RecipeSearchElem from "./RecipeSearchElem";

function RecipePage(){
    const [recipeUrl, setRecipeUrl] = useState("https://www.valdemarsro.dk/lasagne/");
    const [recipe, setRecipe] = useState("");


    function requestRecipe() {
        fetch('http://localhost:5000/addRecipe',{ 
            method: 'Post',
            body: JSON.stringify({
                'url': {recipeUrl}
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },})
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setRecipe(data)
                //handle request return
            })
            .catch((err) => {
                console.log(err.message)
                //handle err
            });
        
    }

    //TODO : see if form can be an element, taking a "onclick" action with a parameter
    return(
        <div>
            <h1>Recipes!</h1>
            <div className="mx-5 my-2">
                <InputGroup >
                    <Form.Control
                    placeholder={recipeUrl}
                    onChange={(e) => setRecipeUrl(e.target.value)}/>
                    <Button
                    onClick={() => requestRecipe()}
                    >Add new Recipe</Button>
                </InputGroup>
            </div>

            <RecipeSearchElem/>
            <Recipe recipe={recipe}></Recipe>
        </div>
    );
}

export default RecipePage
