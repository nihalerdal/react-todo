import React from "react";

function AddTodoForm() {
  const handleAddTodo = (event) => {
    event.preventDefault();
    const todoTitle = event.target.title.value;
    console.log(todoTitle);
    event.target.reset();
  };

  return (
    <div>
      <form onSubmit={handleAddTodo}>
        <label htmlFor="todoTitle">Title</label>
        <input id="todoTitle" type="text" name="title" />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default AddTodoForm;
