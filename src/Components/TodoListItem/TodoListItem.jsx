import styles from "./TodoListItem.module.css";
import { FaTrash } from "react-icons/fa";
import PropTypes from "prop-types";
import { useState } from "react";

function TodoListItem({ title, onRemoveTodo, id, createdTime, onEditTodo , isCompleted}) {
  const [isChecked, setIsChecked] = useState(isCompleted);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTodoTitle, setUpdatedTodoTitle] = useState("");


  const handleTitleChange = (event) => {
     const newTodoTitle = event.target.value;
     setUpdatedTodoTitle(newTodoTitle);
  };

const handleCheckBoxChecked = (event) => {
  const checked = event.target.checked;
  setIsChecked(checked);
};

const handleEditMode = () => {
  setIsEditing(!isEditing);
};

const saveChanges = () => {
  onEditTodo(id, updatedTodoTitle, isCompleted);
  handleEditMode();
};


  return (
    <li className={styles.listItem}>
      <div className={styles.textContainer}>
        {isEditing ? (
          <input
            className={styles.checkBox}
            type="checkbox"
            checked={isChecked}
            onChange={handleCheckBoxChecked}
          />
        ) : (
          <input
            className={styles.checkBox}
            type="checkbox"
            checked={isChecked}
            readOnly
          />
        )}

        <div className={styles.texts}>
          {isEditing ? (
            <input
              className={styles.updatedTitleInput}
              type="text"
              value={updatedTodoTitle}
              onChange={handleTitleChange}
            />
          ) : (
            <span
              style={{ textDecoration: isCompleted ? "line-through" : "none" }}
            >
              {title}
            </span>
          )}

          <span className={styles.date}>
            {new Date(createdTime).toLocaleString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
              hour: "numeric",
              minute: "numeric",
              hour12: true,
            })}
          </span>
        </div>
      </div>
      {isEditing ? (
        <button onClick={saveChanges}>Save</button>
      ) : (
        <button onClick={handleEditMode}>Edit</button>
      )}
      <span className={styles.iconWrapper}>
        <FaTrash
          className={styles.removeButton}
          type="button"
          onClick={() => onRemoveTodo(id)}
        >
          {" "}
          Remove
        </FaTrash>
      </span>
    </li>
  );
}

TodoListItem.propTypes = {
  title: PropTypes.string,
  onRemoveTodo: PropTypes.func,
  id: PropTypes.string.isRequired,
  createdTime: PropTypes.string.isRequired,
  onCompleteTodo: PropTypes.func,
  isCompleted: PropTypes.bool,
};

export default TodoListItem;
