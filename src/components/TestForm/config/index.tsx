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
  // let handler: () => FormInstance;
  const ob = {
    getForm: null,
  };
  const register = ({ getForm }) => {
    ob.getForm = getForm;
  };

  const ComponentConfig: IModalConfig = {
    content: (
      <BaseForm
        columnConfig={columnConfig}
        initData={fakeAsync}
        register={register}
      ></BaseForm>
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
      console.log("ok", data);
      props.onOk?.();
      const form = ob.getForm();
      form.validate().then((rs) => {
        console.log("aaaa1111", rs);
      });
      return Promise.reject();
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
