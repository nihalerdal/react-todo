import * as React from "react";
import TodoList from "./TodoList"; //Import TodoList component
import AddTodoForm from "./AddTodoForm"; //Import AddTodoForm component

function useSemiPersistentState() {
  const [todoList, setTodoList] = React.useState(
    JSON.parse(localStorage.getItem("savedTodoList")) || []
  );

  React.useEffect(() => {
    localStorage.setItem("savedTodoList", JSON.stringify(todoList));
  }, [todoList]);

  return [todoList, setTodoList];
}

function App() {
  const [todoList, setTodoList] = useSemiPersistentState("savedTodoList", []);

  const addTodo = (newTodo) => {
    setTodoList([...todoList, newTodo]); //spread operator to add new todo to list
  };

  const removeTodo = (id) => {
    const newList = todoList.filter((todo) => id !== todo.id);
    setTodoList(newList)
  };

  return (
    <>
      <h1>Todo List</h1>
      <AddTodoForm onAddTodo={addTodo} />
      <TodoList todoList={todoList} onRemoveTodo={removeTodo} />
    </>
  );
}

export default App;
