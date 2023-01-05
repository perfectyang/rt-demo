import { FormInstance, FormProps } from "@arco-design/web-react";
import { useMemoizedFn } from "ahooks";
import React, { useEffect, useRef } from "react";
import FormCmp from "./index";
import { IFormCmpRef, IFormItem } from "./types";

interface IBaseForm {
  columnConfig: IFormItem[];
  register?: (cb: any) => any;
  formProps?: FormProps;
  extraNode?: React.ReactNode;
  prefixNode?: React.ReactNode;
}

export interface IBaseFormRef {
  getForm: () => any;
}

const BaseForm = React.forwardRef<IBaseFormRef, IBaseForm>((props, ref) => {
  const { columnConfig, extraNode, prefixNode, formProps = {} } = props;
  const formRef = useRef<IFormCmpRef>(null);

  const getForm = useMemoizedFn(() => {
    return formRef.current?.getForm();
  });

  React.useImperativeHandle(ref, () => ({
    getForm,
  }));

  useEffect(() => {
    setTimeout(() => {
      props.register?.({
        getForm,
      });
    });
  }, []);

  return (
    <FormCmp
      ref={formRef}
      schemaList={columnConfig}
      formProps={formProps}
      extraNode={extraNode}
      prefixNode={prefixNode}
    />
  );
});

export default BaseForm;
