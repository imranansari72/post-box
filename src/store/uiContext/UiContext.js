import { createContext } from "react";

const UiContext = createContext({
  isLoading: false,
  setIsLoading: () => {},
  isError: false,
  setIsError: () => {},
  toast: {
    show: false,
    message: "",
    type: "",
  },
  setTimedToast: () => {},
});

export default UiContext;
