import React from "react";
import TodoList from "./TodoList";
import AddTodoForm from "./AddTodoForm";
import styles from "./TodoContainer.module.css";

function TodoContainer() {
  const [todoList, setTodoList] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isAscending, setIsAscending] = React.useState(true);

  //Fetching data
  async function fetchData() {
    const url = `https://api.airtable.com/v0/${
      import.meta.env.VITE_AIRTABLE_BASE_ID
    }/${import.meta.env.VITE_TABLE_NAME}?view=Grid%20view`;

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
      return null;
    }
  }
  //sort records
  const handleSort = () => {
    const sortedTodos = [...todoList].sort((todoA, todoB) => {
      const titleA = (todoA.title || "").toLowerCase();
      const titleB = (todoB.title || "").toLowerCase();

      if (titleA < titleB) return isAscending ? -1 : 1;
      if (titleA > titleB) return isAscending ? 1 : -1;
      return 0;
    });

    setTodoList(sortedTodos);
    setIsAscending(!isAscending);
  };

  // Fetch todos when the component mounts
  React.useEffect(() => {
    fetchData();
  }, []);

  //Add a new todo
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
      return null;
    }
  }

  //Remove a todo
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

  //   function toggleSort() {
  //     setIsAscending((prevIsAscending) => !prevIsAscending);
  //   }

  return (
    <div className={styles.TodoContainer}>
      <h1 className={styles.header}>TODO LIST</h1>
      <div className={styles.formAndList}>
        <AddTodoForm onAddTodo={addTodo} />

        {!isLoading && (
          <div className={styles.buttonContainer}>
            <button className={styles.toggleButton} onClick={handleSort}>
              {isAscending ? "Z->A" : "A->Z"}
            </button>
          </div>
        )}

        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <TodoList todoList={todoList} onRemoveTodo={removeTodo} />
        )}
      </div>
    </div>
  );
}
export default TodoContainer;
