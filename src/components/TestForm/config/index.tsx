import { FormInstance } from "@arco-design/web-react";
import React, { useEffect } from "react";
import FormCmp from "../FormCmp";
import BaseForm from "../FormCmp/BaseForm";
import { IModalConfig } from "../hooks";
import columnConfig from "./formConfig";
import TestRender from "./TestRender";

const fakeAsync = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        name: 1222,
        type: "A",
      });
    }, 500);
  });
};

const ModalConfig = (props) => {
  const data = {};

  const ob: any = {
    getForm: () => {},
  };

  const register = ({ getForm }) => {
    ob.getForm = getForm;
  };

  const ComponentConfig: IModalConfig = {
    content: (
      <BaseForm columnConfig={columnConfig} register={register}></BaseForm>
    ),
    style: {},
    title: "我是大帅哥222",
    okText: "保存---是",
    // footer: (
    //   <span
    //     onClick={() => {
    //       console.log("ok", data);
    //       props.modalVisible(false);
    //     }}
    //   >
    //     111
    //   </span>
    // ),
    onOk: async () => {
      props.onOk?.();
      const form = ob.getForm();
      const ret = await form.validate();
      console.log("ret", ret);
      return Promise.resolve();
    },
    onCancel: () => {
      console.log("cancel");
    },
    afterClose: () => {
      console.log("after--close");
    },
  };
  return ComponentConfig;
};

export default ModalConfig;
