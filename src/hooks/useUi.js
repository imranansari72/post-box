import { useContext } from "react";
import  UiContext  from "../store/uiContext/UiContext";

const useUi = () => {
  return useContext(UiContext);
};

export default useUi;
