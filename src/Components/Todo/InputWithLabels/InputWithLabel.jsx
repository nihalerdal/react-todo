import React from "react";
import styles from "./InputWithLabel.module.css";
import PropTypes from "prop-types";

function InputWithLabel({ children, todoTitle, handleTitleChange }) {
  const inputRef = React.useRef();

  React.useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <>
      <input
        className={styles.inputBox}
        ref={inputRef}
        id="todoTitle"
        type="text"
        value={todoTitle}
        onChange={handleTitleChange}
        placeholder="Type your task here (e.g., Schedule a meeting)"
      />
    </>
  );
}


InputWithLabel.propTypes = {
  children: PropTypes.node.isRequired,
  todoTitle: PropTypes.string.isRequired,
  handleTitleChange: PropTypes.func.isRequired,
};
export default InputWithLabel;