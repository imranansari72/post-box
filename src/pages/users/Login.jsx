import React, { useContext, useState, useEffect, forceUpdate } from "react";
import { Link, Navigate } from "react-router-dom";
import AuthContext from "../../store/authContext/AuthContext";
import useValidate from "../../hooks/useValidate";
import Input from "../../ui/Input";
import UserContext from "../../store/userContext/UserContext";
import BoxAlert from "../../ui/BoxAlert";

const Login = () => {
  const authCtx = useContext(AuthContext);
  const userCtx = useContext(UserContext);

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

  const [formIsValid, setFormIsValid] = useState(false);

  useEffect(() => {
    const identifier = setTimeout(() => {
      setFormIsValid(email.isValid && password.isValid);
    }, 500);

    return () => clearTimeout(identifier);
  }, [email.isValid, password.isValid]);

  const loginHandler = (event) => {
    event.preventDefault();
    let userId = null;
    if (formIsValid) {
      userId = authCtx.login(email.value, password.value);
    }
  };

  if (authCtx.isAuthenticated) {
    return <Navigate to={`/feed`} />;
  }

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row px-20">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <p className="py-6">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates
            voluptatum ea vitae ratione? Soluta, voluptatem neque dicta ab a
            debitis.
          </p>
        </div>
        <form
          className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100"
          onSubmit={loginHandler}
        >
          <div className="card-body">
            {/* invalid */}
            {authCtx.error && <BoxAlert message={"Invalid credentials"} />}

            {/* email */}
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
            <div className="grid grid-cols-2 gap-2 mt-4 text-center items-center justify-center">
              <button className="btn btn-primary" type="submit">
                Login
              </button>
              <button className="btn">
                <Link to={`/signup`} className="form-control">
                  Sign up
                </Link>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
