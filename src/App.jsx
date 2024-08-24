import * as React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TodoList from "./TodoList"; //Import TodoList component
import AddTodoForm from "./AddTodoForm"; //Import AddTodoForm component

function App() {
  const [todoList, setTodoList] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  async function fetchData() {
    const url = `https://api.airtable.com/v0/${
      import.meta.env.VITE_AIRTABLE_BASE_ID
    }/${import.meta.env.VITE_TABLE_NAME}`;

    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
      },
    };

    try {
      const response = await fetch(url, options);

      if (!response.ok) {
        const message = `Error: ${response.status}`;
        throw new Error(message);
      }

      const data = await response.json();

      const todos = data.records.map((todo) => {
        return {
          id: todo.id,
          title: todo.fields.title,
        };
      });

      setTodoList(todos);
      setIsLoading(false);
    } catch (error) {
      console.log("Fetch error:", error.message);
      return null
    }
  }

  React.useEffect(() => {
    fetchData();
  }, []);

  async function addTodo(newTodoTitle) {

    const url = `https://api.airtable.com/v0/${
      import.meta.env.VITE_AIRTABLE_BASE_ID
    }/${import.meta.env.VITE_TABLE_NAME}`;

    const options = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        records: [
          {
            fields: {
              title: newTodoTitle,
            },
          },
        ],
      }),
    };
    
    try {
      const response = await fetch(url, options);
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
  
      const newTodo = {
        id: data.records[0].id,
        title: data.records[0].fields.title,
      };

      setTodoList((prevTodoList) => [...prevTodoList, newTodo]);
    } catch (error) {
      console.log(error.message);
      return null                          
    }
  }

    const removeTodo = (id) => {
      const newList = todoList.filter((todo) => id !== todo.id);
      setTodoList(newList);
    };
  
    return (
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <h1>Todo List</h1>
                <AddTodoForm onAddTodo={addTodo} />
                {isLoading ? (
                  <p>Loading...</p>
                ) : (
                  <TodoList todoList={todoList} onRemoveTodo={removeTodo} />
                )}
              </>
            }
          />
        </Routes>
      </BrowserRouter>
    );
  }
  
export default App;
