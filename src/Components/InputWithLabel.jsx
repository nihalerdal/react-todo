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
      <label className={styles.titleLabel} htmlFor="todoTitle">
        {children}
      </label>
      <input
        className={styles.inputBox}
        ref={inputRef}
        id="todoTitle"
        type="text"
        value={todoTitle}
        onChange={handleTitleChange}
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