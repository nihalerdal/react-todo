import * as React from "react";
import TodoList from "./TodoList"; //Import TodoList component
import AddTodoForm from "./AddTodoForm"; //Import AddTodoForm component

function App() {
  const [todoList, setTodoList] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          data: {
            todoList: JSON.parse(localStorage.getItem("savedTodoList")) || [],
          },
        });
      }, 2000);
    }).then((result) => {
      console.log("Fetched todo list:", result.data.todoList);
      setTodoList(result.data.todoList);
      setIsLoading(false);
    });
  }, []);

  React.useEffect(() => {
    {/*early return to not run the code
    if isLoading {
      return;
    }*/}
if (!isLoading){
    localStorage.setItem("savedTodoList", JSON.stringify(todoList));
}}, [todoList, isLoading]);

  const addTodo = (newTodo) => {
    setTodoList([...todoList, newTodo]); //spread operator to add new todo to list
  };

  const removeTodo = (id) => {
    const newList = todoList.filter((todo) => id !== todo.id);
    setTodoList(newList);
  };

  return (
    <>
      <h1>Todo List</h1>
      <AddTodoForm onAddTodo={addTodo} />
      {isLoading ? (<p>"Loading..."</p>) : 
      (<TodoList todoList={todoList} onRemoveTodo={removeTodo}/>)}
    </>
  );
}

export default App;
