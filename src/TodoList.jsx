import TodoListItem from "./TodoListItem";

function TodoList({ todoList, onRemoveTodo }) {
  return (
    <div>
      <ul>
        {todoList.map((todo) => (
          <TodoListItem 
          key={todo.id} 
          title={todo.title} 
          onRemoveTodo={onRemoveTodo} 
          id={todo.id}
          />
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
