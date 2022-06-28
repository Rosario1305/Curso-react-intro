import React from 'react';
import { TodoCounter } from '../TodoCounter';
import { TodoSearch } from '../TodoSearch';
import { TodoList } from '../TodoList';
import { TodoItem } from '../TodoItem';
import { CreateTodoButton } from '../CreateTodoButton';
// import './App.css';

//* Default todos array 4 first time
const defaultTodos = [
  { text: 'Cortar cebolla', completed: true },
  { text: 'Tomar el cursso de intro a React', completed: false },
];

function App() {
  //* Get local storage data
  let initStorageTodos = localStorage.getItem('TODOS_V1');

  //! If there is no data in local storage, use default data
  if (!initStorageTodos || initStorageTodos === '[]') {
    //* Set local storage with default data
    localStorage.setItem('TODOS_V1', JSON.stringify(defaultTodos));
    //* Set initStorageTodos with default data
    initStorageTodos = JSON.stringify(defaultTodos);
  //$ If there is data in local storage, use it
  } else {
    //* Set initStorageTodos with local storage data
    initStorageTodos = JSON.parse(initStorageTodos);
  }

  //* Set initial state
  const [todos, setTodos] = React.useState(initStorageTodos);

  //* Every time todos change, set to local storage
  React.useEffect(() => {
    //* Set local storage with todos state
    localStorage.setItem('TODOS_V1', JSON.stringify(todos));
  }, [todos]);

  const [searchValue, setSearchValue] = React.useState('');
  const completedTodos = todos.filter(todo => !!todo.completed).length;

  const totalTodos = todos.length;

  let searchedTodos = [];

  if (!searchValue.length >= 1) {
    searchedTodos = todos;
  } else {
    searchedTodos = todos.filter(todo => {
      const todoText = todo.text.toLowerCase();
      const searchText = searchValue.toLowerCase();
      return todoText.includes(searchText);
    });
  }

/**
 * TOGGLE TODO COMPLETED/UNCOMPLETED
 * 
 * @param {text} text 
 */
const toggleCompleteTodo = (text) => {
  //* Update the state of todos with setTodos
  setTodos(
    //* Filter the todos array
    todos.map(todo => {
      //* If the text of the todo matches the text of the todo that was clicked
      if (todo.text === text) {
        return {
          //* ... Include the rest of the todo array
          ...todo,
          //* And toggle the completed property
          completed: !todo.completed,
        };
      }
      //* Return the rest of the todos array unchanged
      return todo;
    })
  );
};

/**
 * DELETE TODO
 * 
 * @param {text} text 
 */
const deleteTodo = (text) => {
  //* Update the state of todos with setTodos
  setTodos(todos.filter(
    //* Filter the todos array to remove the todo that was clicked
    todo => todo.text !== text
  ));
};

  return (
    <React.Fragment>
      <TodoCounter
        total={totalTodos}
        completed={completedTodos}
      />
      <TodoSearch
        searchState={[searchValue, setSearchValue]}
      />

      <TodoList>
        {searchedTodos.map(todo => (
          <TodoItem
            key={todo.text}
            text={todo.text}
            completed={todo.completed}
            onComplete={() => toggleCompleteTodo(todo.text)}
            onDelete={() => deleteTodo(todo.text)}
          />
        ))}
      </TodoList>

      <CreateTodoButton />
    </React.Fragment>
  );
}

export default App;