// 暂时还用不上
import { FormInstance } from "@arco-design/web-react";
import React from "react";

interface IFormContext {
  formInstance?: FormInstance;
}
export const FormContext = React.createContext<IFormContext>({});

export const useContext = () => {
  return React.useContext(FormContext);
};
