function TodoListItem(props) {
    console.log(props.todo.title)
  return (
    <li>
      <span>{props.todo.title}</span>
    </li>
  );
}

export default TodoListItem;
