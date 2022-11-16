import React, {useState, createContext, useContext} from "react";

const TodoContext = createContext();

const initialTodoListState = [{id: Math.random() ,todo:"Wash Floor"}]

const ToDoProvider = ({ children }) =>{
    const [toDolist, setToDoList] = useState(initialTodoListState);
    const [doneList, setDoneList] = useState([]);

    const addTodo = (todo) =>{
        // Ensure empty todos are not added
        if(todo.trim().length === 0){
            return
        }
        const newTodo = {
            id: Math.random(),
            todo: todo
        }
        setToDoList([...toDolist, newTodo]);
        
        
    };

    const deleteTodo = (id) =>{
        // Takes the list and adds every element that does not have an id equal to "id"
        const newList = toDolist.filter((todo) => todo.id !== id);
        setToDoList(newList);
    }

    const addToDone = (id) => {
        // Get a done list ready
        const todo = toDolist.filter((todo) => todo.id === id)
        const doneTodo = {
            id: todo[0].id,
            todo: todo[0].todo
        }
        setDoneList([...doneList, doneTodo]);

        deleteTodo(id)
    }

    const deleteToDone = (id) =>{
        const newList = doneList.filter((todo) => todo.id !== id);
        setDoneList(newList);
    }

    const contextValue = {
        toDolist,
        doneList,
        addTodo,
        deleteTodo,
        addToDone,
        deleteToDone,
    };
    return (
        <TodoContext.Provider value={contextValue}>{children}</TodoContext.Provider>
    )
    
};

export const useToDoContext = () => useContext(TodoContext);

export default ToDoProvider;