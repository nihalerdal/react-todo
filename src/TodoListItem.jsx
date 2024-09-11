import styles from "./TodoListItem.module.css"
import { FaTrash } from "react-icons/fa";

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

export default TodoListItem;
