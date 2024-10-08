import styles from "./TodoListItem.module.css";
import { FaTrash } from "react-icons/fa";
import PropTypes from "prop-types";
import { useState } from "react";

function TodoListItem({ title, onRemoveTodo, id, createdTime, onCompleteTodo, isCompleted }) {

const handleCheckBoxChecked = (event) => {
  const checked = event.target.checked;
  onCompleteTodo(id, checked); 
};

  return (
    <li className={styles.listItem}>
      <div className={styles.textContainer}>
        <input
          className={styles.checkBox}
          type="checkbox"
          checked={isCompleted}
          onChange={handleCheckBoxChecked}
        />

        <div className={styles.texts}>
          <span
            style={{ textDecoration: isCompleted ? "line-through" : "none" }}
          >
            {title}
          </span>
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
