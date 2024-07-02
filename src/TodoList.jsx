import TodoListItem from "./TodoListItem";

const todoList = [
  {
    id: 1,
    title: "Complete assignment",
  },
  {
    id: 2,
    title: "Attend mentor session",
  },
  {
    id: 3,
    title: "Read related articles",
  },
];

function TodoList() {
  return (
    <div>
      <ul>
        {todoList.map((todo) => (
          <TodoListItem key={todo.id} todo={todo} />
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
