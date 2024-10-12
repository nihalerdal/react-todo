import TodoListItem from "../TodoListItem/TodoListItem";
import Pagination from "../../Pagination/Pagination";
import { useState } from "react";
import styles from "./TodoList.module.css";
import PropTypes from "prop-types";

function TodoList({ todoList, onRemoveTodo, onEditTodo }) {
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;

   const lastItemPosition = itemsPerPage * currentPage;
   const firstItemPosition = lastItemPosition - itemsPerPage;
   const currentTodos = todoList.slice(firstItemPosition, lastItemPosition);

  return (
    <div className={styles.listWithPagination}>
      <ul className={styles.todoList} style={{ listStyleType: "none" }}>
        {currentTodos.map((todo) => (
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
      <Pagination
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        todoList={todoList}
        itemsPerPage={itemsPerPage}
      />
    </div>
  );
}

TodoList.propTypes = {
  todoList: PropTypes.array,
  onRemoveTodo: PropTypes.func,
  onCompleteTodo: PropTypes.func,
};

export default TodoList;
