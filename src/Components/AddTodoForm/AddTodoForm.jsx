import { useState } from "react";
import InputWithLabel from "../InputWithLabels/InputWithLabel";
import styles from "./AddTodoForm.module.css";
import PropTypes from "prop-types";

function AddTodoForm({ onAddTodo }) {
  const [todoTitle, setTodoTitle] = useState("");

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

AddTodoForm.propTypes = {
  onAddTodo: PropTypes.func,
};

export default AddTodoForm;
