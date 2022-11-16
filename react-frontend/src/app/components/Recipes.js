
import React, { useState } from "react";
import {Button, Form, InputGroup } from "react-bootstrap";

function Recipes(){
    const [recipeUrl, setRecipeUrl] = useState("");

    return(
        <div>
            <h1>Recipes!</h1>
            <div className="mx-5">
                <InputGroup >
                    <Form.Control
                    placeholder={recipeUrl}/>
                    <Button>Add new Recipe</Button>
                    
                </InputGroup>
            </div>
        </div>
    );
}

export default Recipes
