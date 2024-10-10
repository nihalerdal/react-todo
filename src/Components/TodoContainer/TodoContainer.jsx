import { useCallback, useEffect, useState } from "react";
import TodoList from "../TodoList/TodoList";
import AddTodoForm from "../AddTodoForm/AddTodoForm";
import styles from "./TodoContainer.module.css";
import { BiSortAlt2 } from "react-icons/bi";
import PropTypes from "prop-types";

function TodoContainer({ tableName }) {
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAscending, setIsAscending] = useState(false);
  const [isNewestFirst, setIsNewestFirst] = useState(true);
  const [sortBy, setSortBy] = useState("createdTime"); 

  const sortByTitle = (todos) => {
    return [...todos].sort((a, b) => {
      const titleA = a.title.toLowerCase() || "";
      const titleB = b.title.toLowerCase() || "";

      //If both are string, sort alphabetically
      if (isNaN(titleA) && isNaN(titleB)) {
        if (titleA < titleB) return isAscending ? -1 : 1;
        if (titleA > titleB) return isAscending ? 1 : -1;

        return 0;
      }

      // If both are numbers, sort numerically
      else if (!isNaN(titleA) && !isNaN(titleB)) {
        return isAscending ? titleA - titleB : titleB - titleA;
      }

      //If one is a number, number comes first
      else {
        return !isNaN(titleA) ? -1 : 1;
      }
    }); 
  };

  const sortByDate = (todos) => {
    return [...todos].sort((a, b) => {
      const dateA = new Date(a.createdTime);
      const dateB = new Date(b.createdTime);

      return isNewestFirst ? dateB - dateA : dateA - dateB;
    });
  };

  function handleSort() {
    let sortedTodos = [...todoList];

    if (sortBy === "title") {
      sortedTodos = sortByTitle(sortedTodos);
    } else if (sortBy === "createdTime") {
      sortedTodos = sortByDate(sortedTodos);
    }

    setTodoList(sortedTodos);
  }

  const toggle = () => {
    handleSort();
    return sortBy === "title"
      ? setIsAscending(!isAscending)
      : setIsNewestFirst(!isNewestFirst);
  };

  const handleSortByChange = (event) => {
    setSortBy(event.target.value);
    handleSort();
  };

  useEffect(() => {
    handleSort();
  }, [sortBy, isAscending, isNewestFirst]);



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
      console.log(data);
      const todos = data.records.map((todo) => {
        return {
          id: todo.id,
          title: todo.fields.title,
          createdTime: todo.createdTime,
          isCompleted: todo.fields.isCompleted,
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


  //Add a new todo
  async function addTodo(title) {
    const url = `https://api.airtable.com/v0/${
      import.meta.env.VITE_AIRTABLE_BASE_ID
    }/${tableName}`;

    const trimmedTitle = title.trim();

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
              title: trimmedTitle,
              createdTime: new Date(),
              isCompleted: false,
            },
          },
        ],
      }),
    };

    console.log("Request body:", options.body);
    if (trimmedTitle === "") {
      return;
    } else {
      try {
        const response = await fetch(url, options);

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
console.log("response", data); 
        const newTodo = {
          id: data.records[0].id,
          title: data.records[0].fields.title,
          createdTime: data.records[0].fields.createdTime,
          isCompleted: data.records[0].fields.isCompleted,
        };

console.log("newTodo", newTodo)
        setTodoList((prevTodoList) => [...prevTodoList, newTodo]);
        console.log("updated todolist after add:", todoList);
      } catch (error) {
        console.log(error.message);
        return null;
      }
    }
  }

  //Update Checkbox(isCompleted) Status

  async function updateTodo(id, title, isCompleted) {
    const url = `https://api.airtable.com/v0/${
      import.meta.env.VITE_AIRTABLE_BASE_ID
    }/${tableName}/${id}`;
    console.log(isCompleted);

    const options = {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fields: {
          title: title,
          isCompleted: isCompleted ,
        },
      }),
    };

    try {
      const response = await fetch(url, options);
      console.log(response);

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      setTodoList((prevTodoList) =>
        prevTodoList.map((todo) =>
          todo.id === id ? { ...todo, isCompleted: isCompleted, title } : todo
        )
      );
      console.log("Updated todo list after update:", todoList);
    } catch (error) {
      console.log(error.message);
    }
  }
  //Remove a todo
  async function removeTodo(id) {
    const url = `https://api.airtable.com/v0/${
      import.meta.env.VITE_AIRTABLE_BASE_ID
    }/${tableName}/${id}`;

    const options = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        records: id,
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
    <div className={styles.todoContainer}>
      <h1 className={styles.header}>{tableName}</h1>
      <div className={styles.formAndList}>
        <AddTodoForm onAddTodo={addTodo} />

        {!isLoading && (
          <div className={styles.buttonContainer}>
            <div className={styles.sortBy}>
              <label htmlFor="sortBy" className={styles.sortByLabel}>Sort By:</label>
              <select
                id="sortBy"
                value={sortBy}
                onChange={handleSortByChange}
                className={styles.sortBySelectionButton}
              >
                <option value="title">Title</option>
                <option value="createdTime">Created Time</option>
              </select>
            </div>
            {/* <span className={styles.toggleButton} /> */}
            <BiSortAlt2 className={styles.toggleButton} onClick={toggle} />
            {/* <span /> */}
          </div>
        )}

        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <TodoList
            todoList={todoList}
            onRemoveTodo={removeTodo}
            onEditTodo={updateTodo}
          />
        )}
      </div>
    </div>
  );
}

TodoContainer.propTypes = {
  tableName: PropTypes.string.isRequired,
};

export default TodoContainer;
