import TodoListItem from "../TodoListItem/TodoListItem";
import styles from "./TodoList.module.css";
import PropTypes from "prop-types";

function TodoList({ todoList, onRemoveTodo, onEditTodo }) {
  return (
    <ul className={styles.todoList} style={{ listStyleType: "none" }}>
      {todoList.map((todo) => (
        <TodoListItem
          key={todo.id}
          title={todo.title}
          createdTime={todo.createdTime}
          isCompleted={todo.isCompleted}
          onRemoveTodo={onRemoveTodo}
          onEditTodo={onEditTodo}
          id={todo.id}
        />
      ))}
    </ul>
  );
}

TodoList.propTypes = {
  todoList: PropTypes.array,
  onRemoveTodo: PropTypes.func,
  onCompleteTodo: PropTypes.func,
};

export default TodoList;
