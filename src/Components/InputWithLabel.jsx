import React from "react";
import styles from "./InputWithLabel.module.css";
import PropTypes from "prop-types";

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


InputWithLabel.propTypes = {
  children: PropTypes.node,
  todoTitle: PropTypes.string,
  handleTitleChange: PropTypes.func,
};
export default InputWithLabel;
