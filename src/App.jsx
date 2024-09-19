import * as React from "react";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import TodoList from "./Components/TodoList";
import AddTodoForm from "./Components/AddTodoForm";
import styles from "./App.module.css"

function Navigation() {
  return (
    <nav className={styles.navContainer}>
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive
            ? `${styles.navItem} ${styles.activeNavItem}`
            : styles.navItem
        }
      >
        Home
      </NavLink>
      <NavLink
        to="/new"
        className={({ isActive }) =>
          isActive
            ? `${styles.navItem} ${styles.activeNavItem}`
            : styles.navItem
        }
      >
        New Todo
      </NavLink>
    </nav>
  );
}

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

  async function removeTodo(id) {
    const url = `https://api.airtable.com/v0/${
      import.meta.env.VITE_AIRTABLE_BASE_ID
    }/${import.meta.env.VITE_TABLE_NAME}/${id}`;

    const options = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        records: [id],
      }),
    };

    try {
      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      setTodoList((prevTodoList) =>
        prevTodoList.filter((todo) => todo.id !== data.id)
      );
    } catch (error) {
      console.log(error.message);
      return null;
    }
  }

    return (
      <main className={styles.main}>
        <section className={styles.section}>
          <BrowserRouter>
            <Navigation />
            <Routes>
              <Route
                path="/"
                element={
                  <div className={styles.headerAndList}>
                    <h1 className={styles.header}>TODO LIST</h1>
                    <div className={styles.formAndList}>
                      <AddTodoForm onAddTodo={addTodo} />
                      {isLoading ? (
                        <p>Loading...</p>
                      ) : (
                        <TodoList
                          todoList={todoList}
                          onRemoveTodo={removeTodo}
                        />
                      )}
                    </div>
                  </div>
                }
              />
              <Route
                path="/new"
                element={
                  <div className={styles.newTodo}>
                    <h1 className={styles.heading}>New Todo List</h1>
                  </div>
                }
              />
            </Routes>
          </BrowserRouter>
        </section>
      </main>
    );
  }
  
export default App;
