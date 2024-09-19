import React from "react";
import InputWithLabel from "./InputWithLabel";
import styles from "./AddTodoForm.module.css";

function AddTodoForm({ onAddTodo }) {
  const [todoTitle, setTodoTitle] = React.useState("");

  const handleTitleChange = (event) => {
    const newTodoTitle = event.target.value;
    setTodoTitle(newTodoTitle);
  };

  const handleAddTodo = (event) => {
    event.preventDefault();
    onAddTodo(todoTitle);
    setTodoTitle("");
  };

  return (
      <form className={styles.form} onSubmit={handleAddTodo}>
        <InputWithLabel
          todoTitle={todoTitle}
          handleTitleChange={handleTitleChange}
        >
          Title:
        </InputWithLabel>
          <button className={styles.addButton} type="submit">
            Add
          </button>
      </form>
  );
}

export default AddTodoForm;
