import styles from "./TodoListItem.module.css";
import { FaTrash } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { FaSave } from "react-icons/fa";
import PropTypes from "prop-types";
import { useState } from "react";

function TodoListItem({ title, onRemoveTodo, id, createdTime, onEditTodo , isCompleted}) {
  const [isChecked, setIsChecked] = useState(isCompleted);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTodoTitle, setUpdatedTodoTitle] = useState(title || "");


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
  onEditTodo(id, updatedTodoTitle, isChecked);
  handleEditMode();
};


  return (
    <li className={styles.listItem}>
      <div className={styles.textContainer}>
          <input
            className={styles.checkBox}
            type="checkbox"
            checked={isChecked}
            onChange={handleCheckBoxChecked}
            disabled = {!isEditing}
          />
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
              style={{ textDecoration: isChecked ? "line-through" : "none" }}
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
      <div className={styles.updateButtonContainer}>
        {isEditing ? (
          <FaSave className={styles.saveButton} onClick={saveChanges} />
        ) : (
          <FaEdit className={styles.editButton} onClick={handleEditMode} />
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
      </div>
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

