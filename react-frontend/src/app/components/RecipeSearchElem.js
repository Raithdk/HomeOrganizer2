
import React, { useState } from "react";
import {Button, Form, InputGroup, Container, Row, Col} from "react-bootstrap";
import RecipeGrid from "./RecipeGrid";


export default function RecipeSearchElem(){
    const [searchKey, setSearchKey] = useState("musak");
    const [searchResult, setSearchResult] = useState(searchRecipes);

    

    function searchRecipes(){
        fetch('http://localhost:5000/findRecipes?'+ new URLSearchParams({'keyword': searchKey}),
            { 
            method: 'GET',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },})
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setSearchResult(data)
                //handle request return
                // eg. here are results for musakk
            })
            .catch((err) => {
                console.log(err.message)
                //handle err
            });
        
    }

    return(
        <div>
            <div className="mx-5 my-2">
                <InputGroup >
                    <Form.Control
                    placeholder={searchKey}
                    onChange={(e) => setSearchKey(e.target.value)}/>
                    <Button
                    onClick={() => searchRecipes()}
                    >Find Recipes</Button>
                </InputGroup>
            </div>
            
            <RecipeGrid  searchResult={searchResult}></RecipeGrid>
          
        </div>
    )
}


