import { Button, FormInstance } from "@arco-design/web-react";
import React, { useRef } from "react";
import BaseForm, { IBaseFormRef } from "../FormCmp/BaseForm";
import { IFormItem } from "../FormCmp/types";

interface IRenderForm {
  columnConfig: IFormItem[];
  onSubmit?: (val: Record<string, any>) => void;
  onReset?: () => void;
}

type IRenderFormRes = [
  () => FormInstance & { setOptions: (ob: Record<string, any>) => void },
  React.ReactNode
];

const createForm = ({
  columnConfig,
  onSubmit,
  onReset,
}: IRenderForm): IRenderFormRes => {
  const IBaseRef = useRef<IBaseFormRef>(null);
  const _onSubmit = () => {
    const form = IBaseRef.current?.getForm();
    return form
      .validate()
      .then((rs) => {
        return rs;
      })
      .catch((e) => {
        console.error(e);
      });
  };

  const _onReset = () => {
    const form = IBaseRef.current?.getForm();
    form.resetFields();
    onReset?.();
  };

  return [
    () => {
      return IBaseRef.current?.getForm();
    },
    <BaseForm
      ref={IBaseRef}
      columnConfig={columnConfig}
      prefixNode={
        <Button
          style={{
            marginLeft: "10px",
          }}
          type="primary"
          status="danger"
          size="small"
          onClick={() => {
            _onSubmit().then((rs) => {
              onSubmit?.(rs);
            });
          }}
        >
          搜索
        </Button>
      }
      extraNode={
        <>
          <Button
            style={{
              marginLeft: "10px",
            }}
            type="primary"
            status="danger"
            size="small"
            onClick={() => {
              _onSubmit().then((rs) => {
                onSubmit?.(rs);
              });
            }}
          >
            搜索
          </Button>
          <Button
            style={{
              marginLeft: "10px",
            }}
            type="primary"
            size="small"
            onClick={_onReset}
          >
            重置
          </Button>
        </>
      }
    />,
  ];
};

const useCreateForm = () => {
  return {
    createForm,
  };
};

export default useCreateForm;
