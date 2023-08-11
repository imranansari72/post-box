import UiContext from "./UiContext";
import { useState } from "react";

const UiContextProvider = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [toast, setToast] = useState({
    message: "",
    type: "",
    show: false,
  });

  const setTimedToast = (message, type, time) => {
    setToast({
      message: message,
      type: type,
      show: true,
    });
    setTimeout(() => {
      setToast({
        message: "",
        type: "",
        show: false,
      });
    }, time ? time : 1000);
  };

  return (
    <UiContext.Provider
      value={{
        isLoading: isLoading,
        isError: isError,
        errorMessage: errorMessage,
        setIsLoading: setIsLoading,
        setIsError: setIsError,
        setErrorMessage: setErrorMessage,
        toast: toast,
        setTimedToast: setTimedToast,
      }}
    >
      {props.children}
    </UiContext.Provider>
  );
};

export default UiContextProvider;
