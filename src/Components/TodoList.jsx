import TodoListItem from "./TodoListItem";
import styles from "./TodoList.module.css";
import PropTypes from "prop-types";

function TodoList({ todoList, onRemoveTodo }) {
  return (
    <ul className={styles.todoList} style={{ listStyleType: "none" }}>
      {todoList.map((todo) => (
        <TodoListItem
          key={todo.id}
          title={todo.title}
          createdTime={todo.createdTime}
          onRemoveTodo={onRemoveTodo}
          id={todo.id}
        />
      ))}
    </ul>
  );
}

TodoList.propTypes = {
  todoList: PropTypes.array,
  onRemoveTodo: PropTypes.func
};

export default TodoList;
