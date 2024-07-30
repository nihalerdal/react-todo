function InputWithLabel({
  id,
  type = "text",
  children,
  todoTitle,
  handleTitleChange,
  autoFocus,
}) {
  return (
    <>
      <label htmlFor={id}>{children}</label>
      <input
        id={id}
        type={type}
        value={todoTitle}
        onChange={handleTitleChange}
        autoFocus={autoFocus}
      />
    </>
  );
}

export default InputWithLabel;
