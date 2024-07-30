import React from "react";

function InputWithLabel(props) {

  const inputRef = React.useRef();
  console.log(inputRef.current)

  React.useEffect(() => {
    inputRef.current.focus();
  });

  return (
    <>
      <label htmlFor="todoTitle">{props.children}</label>
      <input
        ref={inputRef}
        id="todoTitle"
        type="text"
        value={props.todoTitle}
        onChange={props.handleTitleChange}
      />
    </>
  );
}

export default InputWithLabel;
