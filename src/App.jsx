import * as React from "react";
import TodoList from "./TodoList"; //Import TodoList component
import AddTodoForm from "./AddTodoForm"; //Import AddTodoForm component

function App() {
  const [todoList, setTodoList] = React.useState([]);

  const addTodo = (newTodo) => {
    setTodoList([...todoList, newTodo]); //spread operator to add newtodo to list
  };

  return (
    <div>
      <h1>Todo List</h1>
      <AddTodoForm onAddTodo={addTodo} />
      <TodoList todoList={todoList} /> {/*render todo list*/}
    </div>
  );
}

export default App;
