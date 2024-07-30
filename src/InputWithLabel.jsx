function InputWithLabel({label, todoTitle, handleTitleChange}) {
  return (
    <>
      <label htmlFor="todoTitle">{label}</label>
      <input
        id="todoTitle"
        type="text"
        name="title"
        value={todoTitle} 
        onChange={handleTitleChange}
      />
    </>
  );
}

export default InputWithLabel;
