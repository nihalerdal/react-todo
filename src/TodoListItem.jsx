function TodoListItem({ title, onRemoveTodo, id }) {
  return (
    <li>
      <span>{title}</span>
      <button type="button" onClick={() => onRemoveTodo(id)}>
        Remove
      </button>
    </li>
  );
}

export default TodoListItem;