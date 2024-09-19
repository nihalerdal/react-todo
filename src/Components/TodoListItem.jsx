import styles from "./TodoListItem.module.css";
import { FaTrash } from "react-icons/fa";
import PropTypes from "prop-types";

function TodoListItem({ title, onRemoveTodo, id }) {
  return (
    <li className={styles.listItem}>
      <span>{title}</span>
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
  title: PropTypes.string.isRequired,
  onRemoveTodo: PropTypes.func,
  id: PropTypes.string.isRequired,
};

export default TodoListItem;
