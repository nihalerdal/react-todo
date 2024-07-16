function TodoListItem({todo}) {
    console.log(todo.title)
  return (
    <li>
      <span>{todo.title}</span>
    </li>
  );
}

export default TodoListItem;
