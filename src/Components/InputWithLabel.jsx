import React from "react";
import styles from "./InputWithLabel.module.css";

function InputWithLabel(props) {

  const inputRef = React.useRef();

  React.useEffect(() => {
    inputRef.current.focus();
  });

  return (
    <>
      <label className={styles.titleLabel} htmlFor="todoTitle">
        {props.children}
      </label>
      <input
        className={styles.inputBox}
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
