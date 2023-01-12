import { Button, FormInstance } from "@arco-design/web-react";
import React, { useEffect } from "react";
import BaseForm, { IBaseFormRef } from "../Form/BaseForm";
import { IModalConfig } from "../hooks";
import columnConfig from "./formConfig";

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

const ModalForm = ({ register, columnConfig, initValues = {} }) => {
  const IBaseRef = React.useRef<IBaseFormRef>(null);
  useEffect(() => {
    const form: FormInstance = IBaseRef.current?.getForm();
    form.setFieldsValue({
      ...initValues,
    });
  }, [initValues]);

  return (
    <BaseForm
      ref={IBaseRef}
      columnConfig={columnConfig}
      register={register}
    ></BaseForm>
  );
};

const ModalConfig = (props) => {
  const ob: any = {
    getForm: () => {},
  };

  const register = ({ getForm }) => {
    ob.getForm = getForm;
  };

  const ComponentConfig: IModalConfig = {
    content: (
      <ModalForm
        columnConfig={columnConfig}
        register={register}
        initValues={props?.initValues ?? {}}
      />
    ),
    title: props.title || " ",
    footer: (cancelBtn, okBtn) => {
      return (
        <>
          {cancelBtn}
          {okBtn}
        </>
      );
    },
    onOk: async () => {
      const form = ob.getForm();
      const ret = await form.validate();
      console.log("ret", ret);
      props.onOk?.();
      return Promise.reject();
    },
    onCancel: () => {
      console.log("cancel");
      props.onCancel?.();
    },
    // afterClose: () => {
    //   console.log("after--close");
    // },
  };
  return ComponentConfig;
};

const useModalConfig = () => {
  const genConfig = (props) => {
    return ModalConfig(props);
  };
};

export default ModalConfig;
