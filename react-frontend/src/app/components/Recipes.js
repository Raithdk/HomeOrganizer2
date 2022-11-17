
import React, { useState } from "react";
import {Button, Form, InputGroup } from "react-bootstrap";

function Recipes(){
    const [recipeUrl, setRecipeUrl] = useState("");
    const [recipe, setRecipe] = useState("");

    function requestRecipe() {
        fetch('http://localhost:5000/recipe',{ 
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

    return(
        <div>
            <h1>Recipes!</h1>
            <div className="mx-5">
                <InputGroup >
                    <Form.Control
                    placeholder={recipeUrl}
                    onChange={(e) => setRecipeUrl(e.target.value)}/>
                    <Button
                    onClick={() => requestRecipe()}
                    >Add new Recipe</Button>
                </InputGroup>
            </div>

            <h1>{recipe.headline}</h1>
        </div>
    );
}

export default Recipes
