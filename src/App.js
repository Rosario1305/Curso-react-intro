import React from "react";
import {TodoCounter} from "./TodoCounter.js"
import {TodoSearch} from "./TodoSearch.js";
import {TodoList} from "./TodoList.js";
import {TodoItem} from "./TodoItem.js";
import {CreateTodoButton} from "./CreateTodoButton.js";
import WebFont from 'webfontloader';
import './App.css';

const todos=[
  {text:'Cortar cebolla', completed:false},
  {text:'Tomar el curso de intro de react', completed:false},
  {text:'Cortar Llorar con la llorona', completed:false},
];

function App() {
  React.useEffect(() => {
    WebFont.load({
      google: {
        families: ['Droid Sans', 'Chilanka', 'Lato']
      }
    });
   }, []);
  return (
    <React.Fragment>
      <div className="Container">
      <TodoCounter />
      <TodoSearch />

      <TodoList>
        {todos.map(todo => (
          <TodoItem
            key={todo.text}
            text={todo.text}
            completed={todo.completed}
          />
        ))}
      </TodoList>

      <CreateTodoButton />
      </div>
    </React.Fragment>
  );
}



export default App;
