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

  return (
    <div
      className={`${classes.control} ${
        isValid === false ? classes.invalid : ""
      }`}
    >
      <label htmlFor={id}>{label}</label>
      <input
        type={type}
        id={id}
        value={emailStateValue}
        onChange={emailChangeHandler}
        onBlur={validateEmailHandler}
        ref={inputRef}
      />
    </div>
  );
};

export default Input;
