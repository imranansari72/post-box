import React, { useReducer } from "react";

const USER_INPUT = "USER_INPUT";
const INPUT_BLUR = "INPUT_BLUR";

const validateReducer = (state, action) => {
  if (action.type === USER_INPUT) {
    return {
      value: action.val,
      isValid: action.validation(action.val),
    };
  }
  if (action.type === INPUT_BLUR) {
    return {
      value: action.val,
      isValid: action.validation(action.val),
    };
  }
  // resert the values
  if (action.type === "RESET") {
    return {
      value: "",
      isValid: null,
    };
  }
};

const useValidate = (validate, initialState) => {
  const [state, dispatcher] = useReducer(validateReducer, initialState);

  const onChangeHandler = (event) => {
    dispatcher({
      type: USER_INPUT,
      val: event.target.value,
      validation: validate,
    });
  };

  // reset
  const reset = () => {
    dispatcher({ type: "RESET" });
  }

  const onBlurHandler = (event) => {
    dispatcher({
      type: INPUT_BLUR,
      val: event.target.value,
      validation: validate,
    });
  };

  return [state, onChangeHandler, onBlurHandler, reset];
};

export default useValidate;
