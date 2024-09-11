import styles from "./TodoListItem.module.css"

function TodoListItem({ title, onRemoveTodo, id }) {
  return (
    <li className={styles.listItem}>
      <span>{title}</span>
      <button
        className={styles.removeButton}
        type="button"
        onClick={() => onRemoveTodo(id)}
      >
        Remove
      </button>
    </li>
  );
}

export default TodoListItem;
