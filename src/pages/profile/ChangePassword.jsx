import React, { useEffect, useReducer, useState } from "react";
import useValidate from "../../hooks/useValidate";
import ChangePasswordForm from "./ChangePasswordForm";
import useUser from "../../hooks/useUser";
import Toast from "../../ui/Toast";

const ChangePassword = () => {
  const { changePassword } = useUser();

  const [isChanged, setIsChanged] = useState(false);

  const [
    currentPassword,
    onCurrentPasswordChange,
    onCurrentPasswordBlur,
    onCurrentPasswordReset,
  ] = useValidate((value) => value.trim().length > 6, {
    value: "",
    isValid: null,
  });

  const [
    newPassword,
    onNewPasswordChange,
    onNewPasswordBlur,
    onNewPasswordReset,
  ] = useValidate((value) => value.trim().length > 6, {
    value: "",
    isValid: null,
  });

  const confirmPasswordValidator = (value) => {
    return value.trim().length > 6 && value === newPassword.value;
  };

  const [
    confirmPassword,
    onConfirmPasswordChange,
    onConfirmPasswordBlur,
    onConfirmPasswordReset,
  ] = useValidate(confirmPasswordValidator, {
    value: "",
    isValid: null,
  });

  const [formIsValid, setFormIsValid] = useState(false);

  // confirm password validation

  useEffect(() => {
    if (
      currentPassword.isValid &&
      newPassword.isValid &&
      confirmPassword.isValid
    ) {
      setFormIsValid(true);
    } else {
      setFormIsValid(false);
    }
  }, [currentPassword.isValid, newPassword.isValid, confirmPassword.isValid]);

  const submitHandler = (event) => {
    event.preventDefault();
    if (formIsValid) {
      try {
        // change password  from user using user.cahngePassword()
        changePassword(currentPassword.value, newPassword.value);
        setIsChanged(true);
        onCurrentPasswordReset();
        onNewPasswordReset();
        onConfirmPasswordReset();

        setTimeout(() => {
          setIsChanged(false);
        }, 500);
      } catch (error) {
        console.log(error.message);
        alert(error.message);
      }
    } else {
      console.log("Invalid!");
    }
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col w-[90%]">
        <h1 className=" text-2xl lg:text-4xl font-semibold mb-4">
          Change Password
        </h1>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <div className="card-body p-0">
            <ChangePasswordForm
              inputState={{
                currentPassword,
                newPassword,
                confirmPassword,
              }}
              onCurrentPasswordBlur={onCurrentPasswordBlur}
              onCurrentPasswordChange={onCurrentPasswordChange}
              onNewPasswordBlur={onNewPasswordBlur}
              onNewPasswordChange={onNewPasswordChange}
              onConfirmPasswordBlur={onConfirmPasswordBlur}
              onConfirmPasswordChange={onConfirmPasswordChange}
              submitHandler={submitHandler}
            />
          </div>
        </div>
      </div>
      {isChanged && (
        <Toast type={"success"} message="Password Changed Successfully" />
      )}
    </div>
  );
};

export default ChangePassword;
