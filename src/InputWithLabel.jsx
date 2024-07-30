function InputWithLabel({
  id,
  type = "text",
  children,
  todoTitle,
  handleTitleChange,
}) {
  return (
    <>
      <label htmlFor={id}>{children}</label>
      <input
        id={id}
        type={type}
        value={todoTitle}
        onChange={handleTitleChange}
      />
    </>
  );
}

export default InputWithLabel;
