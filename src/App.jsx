import * as React from "react";
import TodoList from "./TodoList"; //Import TodoList component
import AddTodoForm from "./AddTodoForm"; //Import AddTodoForm component

function useSemiPersistentState(key, initialState) {
  const [value, setValue] = React.useState(
    JSON.parse(localStorage.getItem(key)) || initialState
  );

  React.useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue];
}

function App() {
  const [todoList, setTodoList] = useSemiPersistentState("savedTodoList", []);

  const addTodo = (newTodo) => {
    setTodoList([...todoList, newTodo]); //spread operator to add new todo to list
  };

  return (
    <>
      <h1>Todo List</h1>
      <AddTodoForm onAddTodo={addTodo} />
      <TodoList todoList={todoList} /> {/*render todo list*/}
    </>
  );
}

export default App;
