import { FormInstance, FormProps } from "@arco-design/web-react";
import { useMemoizedFn } from "ahooks";
import React, { useEffect, useRef } from "react";
import FormCmp from "./index";
import { IFormCmpRef, IFormItem } from "./types";

interface IBaseForm {
  columnConfig: IFormItem[];
  initData?: () => Promise<Record<string, any>>;
  register?: (cb: any) => any;
  formProps?: FormProps;
  extraNode?: React.ReactNode;
}

export interface IBaseFormRef {
  getForm: () => any;
}

const BaseForm = React.forwardRef<IBaseFormRef, IBaseForm>((props, ref) => {
  const { columnConfig, initData, extraNode, formProps = {} } = props;
  const [initValues, setInitValues] = React.useState<Record<string, any>>();
  const formRef = useRef<IFormCmpRef>(null);
  useEffect(() => {
    if (initData) {
      console.log("render---init");
      initData().then((rs: any) => {
        setInitValues(rs);
      });
    }
  }, [initData]);

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
      initValues={initValues}
      formProps={formProps}
      extraNode={extraNode}
    />
  );
});

export default BaseForm;
