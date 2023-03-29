import React, { useRef, useEffect } from "react";
import classes from "./Input.module.css";

const Input = (props) => {
  const {
    isValid,
    id,
    label,
    type,
    emailStateValue,
    emailChangeHandler,
    validateEmailHandler,
  } = props;

  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div
      className={`${classes.control} ${
        isValid === false ? classes.invalid : ""
      }`}
    >
      <label htmlFor={id}>{label}</label>
      <input
        ref={inputRef}
        type={type}
        id={id}
        value={emailStateValue}
        onChange={emailChangeHandler}
        onBlur={validateEmailHandler}
      />
    </div>
  );
};

export default Input;
