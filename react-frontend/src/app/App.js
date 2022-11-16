import React, { Suspense, lazy} from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Frontpage from './components/Frontpage'
import { Navbar, Container, Nav } from 'react-bootstrap';
import ToDoProvider from './components/ToDoProvider';



const Todo = lazy(() => import("./components/ToDo"))
const Recipes = lazy(() => import("./components/Recipes"))


export default function App() {
  return (
    <div className="App">
      <ToDoProvider>
        <BrowserRouter>
          <Suspense fallback="Loading">
            <NavigationBar/>
              <Routes>
                <Route index element={<Frontpage/>} />
                <Route path="/todo" element={<Todo/>} />
                <Route path="/recipes" element={<Recipes/>}></Route>
              </Routes>
          </Suspense>
        </BrowserRouter>
      </ToDoProvider>
      
    </div>
  );
}

function NavigationBar() {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">HomeOrganizer</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/recipes">Recipes</Nav.Link>
            <Nav.Link href="/todo">TODOs</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}


