import React, { useEffect, useState } from "react";
import AuthContext from "../../store/authContext/AuthContext";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import Input from "../../ui/Input";
import useValidate from "../../hooks/useValidate";

const Signup = () => {
  const authCtx = useContext(AuthContext);

  const [email, onEmailChange, onEmailBlur] = useValidate(
    (value) => value.includes("@"),
    {
      value: "",
      isValid: null,
    }
  );

  const [password, onPasswordChange, onPasswordBlur] = useValidate(
    (value) => value.trim().length > 6,
    {
      value: "",
      isValid: null,
    }
  );

  const [confirm, setConfirm] = useState({
    value: "",
    isValid: null,
  });

  const [formIsValid, setFormIsValid] = useState(false);

  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log(
        email.isValid,
        password.isValid,
        confirm.isValid,
        "in usestate"
      );
      setFormIsValid(email.isValid && password.isValid && confirm.isValid);
    }, 500);

    return () => clearTimeout(identifier);
  }, [email.isValid, password.isValid, confirm.isValid]);

  const signupHandler = (event) => {
    event.preventDefault();
    console.log("in sifnup handler");
    console.log(formIsValid, "form");
    if (formIsValid) {
      authCtx.signup({
        email: email.value,
        password: password.value,
      });
    }
  };

  if (authCtx.isAuthenticated) {
    return <Navigate to={`/feed`} />;
  }

  return (
    <div className="w-full flex items-center justify-center my-10">
      <form
        className="card w-full max-w-sm shadow-2xl bg-base-100"
        onSubmit={signupHandler}
      >
        <div className="card-body">
          <h2 className="text-4xl">Sign Up</h2>

          <Input
            id="email"
            type="email"
            placeholder="email"
            className={`input input-bordered focus:outline-none  ${
              email.isValid === false ? " input-error" : ""
            }`}
            value={email.value}
            onChange={onEmailChange}
            onBlur={onEmailBlur}
            label="Email"
          />
          <Input
            id="password"
            type="password"
            placeholder="password"
            className={`input input-bordered focus:outline-none  ${
              password.isValid === false ? " input-error" : ""
            }`}
            value={password.value}
            onChange={onPasswordChange}
            onBlur={onPasswordBlur}
            label="Password"
          />
          <Input
            id="confirm"
            type="password"
            placeholder="confirm password"
            className={`input input-bordered focus:outline-none  ${
              confirm.isValid === false ? " input-error" : ""
            }`}
            value={confirm.value}
            onChange={(e) => {
              setConfirm({
                value: e.target.value,
                isValid: e.target.value === password.value,
              });
            }}
            onBlur={(e) => {
              setConfirm({
                value: e.target.value,
                isValid: e.target.value === password.value,
              });
            }}
            label="Confirm Password"
          />
          {confirm.isValid === false && (
            <label className="label">
              <a
                href="#"
                className=" text-red-500 label-text-alt link link-hover"
              >
                Password Not Match
              </a>
            </label>
          )}
          <button className="btn btn-primary mt-2" type="submit">
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
