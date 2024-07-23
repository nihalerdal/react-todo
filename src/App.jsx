import * as React from "react";
import TodoList from "./TodoList"; //Import TodoList component
import AddTodoForm from "./AddTodoForm"; //Import AddTodoForm component

function App() {
  
  const [todoList, setTodoList] = React.useState(
    JSON.parse(localStorage.getItem("savedTodoList")) || []);

  React.useEffect(() => {
    localStorage.setItem("savedTodoList", JSON.stringify(todoList));
  }, [todoList]);
  

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
