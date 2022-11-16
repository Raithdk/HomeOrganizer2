import { useToDoContext } from "./ToDoProvider";
import { Button , InputGroup, Form} from 'react-bootstrap';
import { useState } from "react";


const ToDoForm = () => {
    const { addTodo} = useToDoContext();
    const [input, setInput] = useState([]);

    const handleSubmit = () =>{
        console.log("input")
        addTodo(input)
        // clear input box
        setInput("")
    }

    return(
        <div className='mx-5'>
                <InputGroup>
                    <Form.Control
                    placeholder={input}
                    onChange={(e) => setInput(e.target.value)}/>
                    <Button onClick={() => handleSubmit()}>
                        Add 
                    </Button>
                </InputGroup>
        </div>)
};

export default ToDoForm;