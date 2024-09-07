import styles from "./TodoListItem.module.css"

function TodoListItem({ title, onRemoveTodo, id }) {
  return (
    <li className={styles.item}>
      <span>{title}</span>
      <button type="button" onClick={() => onRemoveTodo(id)}>
        Remove
      </button>
    </li>
  );
}

export default TodoListItem;
