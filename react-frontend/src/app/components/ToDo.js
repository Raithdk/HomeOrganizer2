
import React from 'react';
import { Button, ListGroup} from 'react-bootstrap';
import ToDoForm from './ToDoForm';
import { useToDoContext } from './ToDoProvider';

export default function ToDo(){
    const { toDolist, doneList, deleteTodo, addToDone, deleteToDone} = useToDoContext();

    return(
        <div>
            <h2>ToDos</h2>
            <ToDoForm/>
            <ListGroup as="ul" className="mx-5 m-3">
                {toDolist.map((todo) => (
                    <ListGroup.Item as="li" key={todo.id}>
                        {todo.todo}
                        <Button className="mx-1" variant="success" onClick={() => addToDone(todo.id)}>✓</Button>
                        <Button className="mx-1" variant="danger" onClick={() => deleteTodo(todo.id)}>&times;</Button>    
                    </ListGroup.Item>
                ))}
            </ListGroup>

            <h2>DONE</h2>
            <ListGroup as="ul" className="mx-5 m-3">
                {doneList.map((todo) => (
                    <ListGroup.Item as="li" key={todo.id}>
                        {todo.todo}
                        <Button className="mx-1" variant="danger" onClick={() => deleteToDone(todo.id)}>&times;</Button>            
                    </ListGroup.Item>
                ))}
            </ListGroup>    
        </div>
    );

}



