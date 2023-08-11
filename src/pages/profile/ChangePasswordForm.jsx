import React from "react";
import Input from "../../ui/Input";
import PasswordInput from "../../ui/PasswordInput";

const ChangePasswordForm = (props) => {
  const {
    inputState,
    onCurrentPasswordChange,
    onCurrentPasswordBlur,
    onNewPasswordChange,
    onNewPasswordBlur,
    onConfirmPasswordChange,
    onConfirmPasswordBlur,
    submitHandler,
  } = props;

  const { currentPassword, newPassword, confirmPassword } = inputState;

  return (
    <form
      onSubmit={submitHandler}
      className="card w-full flex-shrink-0 max-w-sm shadow-2xl bg-base-100"
    >
      <div className="card-body">
        <PasswordInput
          id="currentPassword"
          placeholder="Enter Your Current Password"
          error={currentPassword.isValid === false ? " input-error" : ""}
          label="Current Password"
          value={currentPassword.value}
          onChange={onCurrentPasswordChange}
          onBlur={onCurrentPasswordBlur}
        />

        <PasswordInput
          id="newPassword"
          placeholder="Enter Your New Password"
          error={newPassword.isValid === false ? " input-error" : ""}
          label="New Password"
          value={newPassword.value}
          onChange={onNewPasswordChange}
          onBlur={onNewPasswordBlur}
        />
        <PasswordInput
          id="confirmPassword"
          placeholder="Confirm Password"
          error={confirmPassword.isValid === false ? " input-error" : ""}
          label="Confirm Password"
          value={confirmPassword.value}
          onChange={onConfirmPasswordChange}
          onBlur={onConfirmPasswordBlur}
        />

        {!confirmPassword.isValid && confirmPassword.value !== "" && (
          <label className="px-2 py-2 text-sm text-red-400">
            Password Not Match.
          </label>
        )}
        <button type="submit" className="btn btn-primary">
          Change
        </button>
        <button type="submit" className="btn">
          Cancel
        </button>
      </div>
    </form>
  );
};

export default ChangePasswordForm;
