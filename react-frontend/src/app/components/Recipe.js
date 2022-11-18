import {Container, Row, Col } from "react-bootstrap";
import OverlineText from "./OverlineText";

const Recipe = ({recipe}) => {
    
    return(
        <div>
            <h1>{recipe.headline}</h1>
            <Container>
                <Row>
            {recipe && Object.keys(recipe.ingredients).map((part) => 
            {
                return(
                    <Col >
                        <h2>{part}</h2>
                    {recipe.ingredients[part].map((ingredient) => {
                            return (<OverlineText className="m-1" text={ingredient} ></OverlineText>)
                        })}
                    </Col>
                )
            }
            )}
                </Row>
            </Container>
        </div>
    )
}

export default Recipe