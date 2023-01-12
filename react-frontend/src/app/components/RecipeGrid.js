import { Container, Row, Col, Button  } from "react-bootstrap";

export default function RecipeGrid(searchResult){
   
    searchResult = searchResult.searchResult
    if(searchResult){
        if(Object.keys(searchResult).length == 0){  
            return(
                <div>
                    <h2>Could not find any recipes with that keyword :-/</h2>
                </div>
            )
        } else {
            return(
                <div>
                <Container>
                    <Row>
                        {Object.keys(searchResult).map((key) => 
                        {
                            console.log(typeof(recipe))
                            return(
                                gridItem(searchResult[key])
                            )
                        })}
                    </Row>
                </Container>
            </div>
            )
    }
}
}

function gridItem(result){
    return(
        <Col className="border m-2 text-center p-2" >
            <img width="150" src={result.picUrl}></img>
            <p>
                <a href={result.url}>{result.name}</a>
            </p>
            <Button>Read</Button> <Button>Add</Button>
        </Col>
    )
}