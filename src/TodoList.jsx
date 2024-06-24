import * as React from "react";

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
          {todoList.map((item) => (
            <li key={item.id}>
              <span>{item.title}</span>
            </li>
          ))}
        </ul>  
    </div>
  );
}

export default TodoList;
