import React from "react";

function AddTodoForm(props) {

  const [todoTitle, setTodoTitle] = React.useState('')

  const handleTitleChange = (event) =>{
    const newTodoTitle = event.target.value;
    console.log(newTodoTitle);
    setTodoTitle(newTodoTitle);
  }

  const handleAddTodo = (event) => {
    event.preventDefault();
    console.log(todoTitle);
    event.target.reset();
    props.onAddTodo(todoTitle)
  };

  return (
    <div>
      <form onSubmit={handleAddTodo}>
        <label htmlFor="todoTitle">Title</label>
        <input
          id="todoTitle"
          type="text"
          name="title"
          value={todoTitle} //controlled input
          onChange={handleTitleChange}
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default AddTodoForm;
