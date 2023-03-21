import React, { useState, useEffect, useReducer } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";

// emailReducer can be defined outside the Login component because it does not depend on the data outside login.
const emailReducer = (state, action) => {
  return {
    value: "",
    isValid: false,
  };
};

const Login = (props) => {
  // We should use useReducer when we have multiple states we are handling
  // for example, our setFormIsValid relies on enteredPassword and email.
  // This means that we can't make use of prev because we are relying on two different states.
  // Therefore, we must use a useReducer
  // const [enteredEmail, setEnteredEmail] = useState("");
  // const [emailIsValid, setEmailIsValid] = useState();
  const [enteredPassword, setEnteredPassword] = useState("");
  const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  // Visual studio ensures that we have one piece of code in one place
  // and anything inside of this code runs when we reload our page.
  // useEffect() deals with side effects. Something that is triggered in
  // response to something. That something could be a user input, or
  // an http request response. Whenever you have an action that should be occur in
  // response to another action, that is a side effect.

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: false,
  });

  // useEffect(() => {
  //   console.log("effect running");
  // }, [enteredPassword]);

  // useEffect(() => {
  //   console.log("Use Effect was run!");
  //   const identifier = setTimeout(() => {
  //     setFormIsValid(enteredEmail.includes("@") && trim().length > 6);
  //   }, 500);

  //   // this is a cleanup function and it runs before every new side-effect
  //   // function
  //   return () => {
  //     console.log("clean up");
  //     clearTimeout(identifier);
  //   };
  // }, [enteredEmail, enteredPassword]);

  const emailChangeHandler = (event) => {
    dispatchEmail({
      type: "USER_INPUT",
      val: event.target.value,
    });

    setFormIsValid(
      event.target.value.includes("@") && enteredPassword.trim().length > 6
    );
  };

  const passwordChangeHandler = (event) => {
    setEnteredPassword(event.target.value);

    setFormIsValid(emailState.isValid && event.target.value.trim().length > 6);
  };

  const validateEmailHandler = () => {
    dispatchEmail({type: 'INPUT_BLUR'});
  };

  const validatePasswordHandler = () => {
    setPasswordIsValid(enteredPassword.trim().length > 6);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, enteredPassword);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordIsValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={enteredPassword}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
