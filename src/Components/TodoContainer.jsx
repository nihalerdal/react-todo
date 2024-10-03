import { useCallback, useEffect, useState } from "react";
import TodoList from "./TodoList";
import AddTodoForm from "./AddTodoForm";
import styles from "./TodoContainer.module.css";
import PropTypes from "prop-types";

function TodoContainer({ tableName }) {
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAscending, setIsAscending] = useState(false);
  const [isNewestFirst, setIsNewestFirst] = useState(false);

  //Fetching data
  const fetchData = useCallback(async () => {
    const url = `https://api.airtable.com/v0/${
      import.meta.env.VITE_AIRTABLE_BASE_ID
    }/${tableName}?view=Grid%20view`;

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
          createdTime: todo.createdTime,
        };
      });

      setTodoList(todos);
      setIsLoading(false);
    } catch (error) {
      console.log("Fetch error:", error.message);
      return null;
    }
  }, [tableName]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  //sort records
  const handleSortByTitle = () => {
    const sortedTodos = [...todoList].sort((todoA, todoB) => {
      const titleA = todoA.title || "";
      const titleB = todoB.title || "";

      if (isNaN(titleA) && isNaN(titleB)) {
        const titleALower = titleA.toLowerCase();
        const titleBLower = titleB.toLowerCase();

        if (titleALower < titleBLower) return !isAscending ? -1 : 1;
        if (titleALower > titleBLower) return !isAscending ? 1 : -1;

        return 0;
      } else if (!isNaN(titleA) && !isNaN(titleB)) {
        return !isAscending ? titleA - titleB : titleB - titleA;
      } else {
        return !isNaN(titleA) ? -1 : 1;
      }
    });

    setTodoList(sortedTodos);
    setIsAscending(!isAscending);
  };

  const handleSortByDate = () => {
    const sortedTodos = [...todoList].sort((todoA, todoB) => {
      const dateA = new Date(todoA.createdTime);
      const dateB = new Date(todoB.createdTime);

      return !isNewestFirst ? dateB - dateA : dateA - dateB;
    });

    setTodoList(sortedTodos);
    setIsNewestFirst(!isNewestFirst);
  };

  //Add a new todo
  async function addTodo(title) {
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
              title: title,
              createdTime: new Date(),
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
        createdTime: data.records[0].fields.createdTime,
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

  return (
    <div className={styles.TodoContainer}>
      <h1 className={styles.header}>{tableName}</h1>
      <div className={styles.formAndList}>
        <AddTodoForm onAddTodo={addTodo} />

        {!isLoading && (
          <div className={styles.buttonContainer}>
            <button
              className={styles.buttonSortByTitle}
              onClick={handleSortByTitle}
            >
              {isAscending ? "Z->A" : "A->Z"}
            </button>
            <button
              className={styles.buttonSortByDate}
              onClick={handleSortByDate}
            >
              {isNewestFirst ? "Show Oldest First" : "Show Newest First"}
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

TodoContainer.propTypes = {
  tableName: PropTypes.string.isRequired,
};

export default TodoContainer;
