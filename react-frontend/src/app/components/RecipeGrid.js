import {Button, Container, Row, Col  } from "react-bootstrap";

export default function RecipeGrid(searchResult){
    console.log(searchResult.searchResult)
    searchResult = searchResult.searchResult
    return(
        <div>
        <Container>
            <Row>
                {searchResult && Object.keys(searchResult).map((key) => 
                {
                    console.log(typeof(recipe))
                    return(
                        <Col >
                            <img width="150" src={searchResult[key].picUrl}></img>
                            <h2><a href={searchResult[key].url}>{searchResult[key].name}</a></h2>
                        </Col>
                    )
                })}
            </Row>
        </Container>
    </div>
    )
}