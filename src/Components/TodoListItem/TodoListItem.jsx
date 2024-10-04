import styles from "./TodoListItem.module.css";
import { FaTrash } from "react-icons/fa";
import PropTypes from "prop-types";

function TodoListItem({ title, onRemoveTodo, id, createdTime }) {
  return (
    <li className={styles.listItem}>
      <div className={styles.textContainer}>
        <span>{title}</span>
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
};

export default TodoListItem;
