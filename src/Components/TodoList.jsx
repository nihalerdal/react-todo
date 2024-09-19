import TodoListItem from "./TodoListItem";
import styles from "./TodoList.module.css";

function TodoList({ todoList, onRemoveTodo }) {
  return (
      <ul className={styles.todoList} style={{listStyleType:"none"}}>
        {todoList.map((todo) => (
          <TodoListItem 
          key={todo.id} 
          title={todo.title} 
          onRemoveTodo={onRemoveTodo} 
          id={todo.id}
          />
        ))}
      </ul>
  );
}

export default TodoList;
