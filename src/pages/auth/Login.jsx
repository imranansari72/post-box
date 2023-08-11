import React, { useState, useEffect } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import useValidate from "../../hooks/useValidate";
import Input from "../../ui/Input";
import PasswordInput from "../../ui/PasswordInput";
import useAuth from "../../hooks/useAuth";
import Toast from "../../ui/Toast";
import axios from "axios";

const Login = () => {
  const authCtx = useAuth();

  const navigate = useNavigate();

  const [email, onEmailChange, onEmailBlur] = useValidate(
    (value) => !value.includes(" ") && value.trim().length > 3,
    {
      value: "",
      isValid: null,
    }
  );

  const [password, onPasswordChange, onPasswordBlur] = useValidate(
    (value) => value.trim().length >= 6,
    {
      value: "",
      isValid: null,
    }
  );

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const [formIsValid, setFormIsValid] = useState(false);

  useEffect(() => {
    const identifier = setTimeout(() => {
      setFormIsValid(email.isValid && password.isValid);
    }, 500);

    return () => clearTimeout(identifier);
  }, [email.isValid, password.isValid]);

  const loginHandler = async (event) => {
    event.preventDefault();
    console.log("loginHandler", formIsValid);
    if (formIsValid) {
      setLoading(true);
      try {
        axios
          .post(
            process.env.REACT_APP_BASE_URL + "/auth/login",
            {
              email: email.value,
              password: password.value,
            },
            {
              withCredentials: true,
            }
          )
          .then((res) => {
            console.log("response from login api : ", res.data);
            if (res.data.success) {
              authCtx.login(res.data.user);
              navigate("/", { replace: true });
              setLoading(false);
            } else {
              setError(res.data.message);
              setTimeout(() => {
                setError(null);
              }, 3000);
              setLoading(false);
            }
          })
          .catch((err) => {
            console.log("error in login api : ", err);
            setError(err.message);
            setTimeout(() => {
              setError(null);
            }, 3000);
          });
      } catch (err) {
        setError(err.message);
        setTimeout(() => {
          setError(null);
        }, 3000);
      }
      setLoading(false);
      // authCtx
      //   .login(email.value, password.value)
      //   .then((res) => {
      //     navigate("/", { replace: true });
      //   })
      //   .catch((err) => {
      //     setError(err.message);
      //     setTimeout(() => {
      //       setError(null);
      //     }, 3000);
      //   });
    } else {
      setError("Invalid credentials");
      setTimeout(() => {
        setError(null);
      }, 3000);
    }
  };
  return (
    <>
      {authCtx.isAuthenticated && <Navigate to="/" />}
      <div className="hero min-h-screen bg-hero-pattern bg-no-repeat">
        {error && <Toast message={error} type={"error"} />}
        <div className="hero-content flex-col lg:flex-row px-20">
          <div className=" text-center lg:text-left">
            <h1 className="font-extrabold text-transparent text-6xl pb-4 bg-clip-text bg-gradient-to-r from-gray-100 to-gray-200">
              Login now!
            </h1>
            <p className="py-6">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Voluptates voluptatum ea vitae ratione? Soluta, voluptatem neque
              dicta ab a debitis.
            </p>
          </div>
          {loading ? (
            <div className="flex justify-center items-center">
              <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32"></div>
            </div>
          ) : (
            <form
              className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100"
              onSubmit={loginHandler}
            >
              <div className="card-body">
                {/* invalid */}
                {/* {authCtx.error && (
              <BoxAlert message={"Invalid credentials"} type={"error"} />
            )} */}

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
                  label="Email or email"
                />
                <PasswordInput
                  id="password"
                  placeholder="password"
                  error={password.isValid === false ? " input-error" : ""}
                  value={password.value}
                  onChange={onPasswordChange}
                  onBlur={onPasswordBlur}
                  label="Password"
                />
                <div className="grid grid-cols-1 gap-2 mt-4 text-center items-center justify-center">
                  <button className="btn btn-primary" type="submit">
                    Login
                  </button>
                  <div className="divider">OR</div>
                  <Link to={`/signup`} className="form-control btn">
                    Sign up
                  </Link>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default Login;
