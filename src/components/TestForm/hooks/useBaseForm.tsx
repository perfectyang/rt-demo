import { Button, FormInstance } from "@arco-design/web-react";
import React, { useRef } from "react";
import BaseForm, { IBaseFormRef } from "../FormCmp/BaseForm";
import { IFormItem } from "../FormCmp/types";

interface IRenderForm {
  columnConfig: IFormItem[];
  initData?: () => Promise<Record<string, any>>;
  onSubmit?: (val: Record<string, any>) => void;
  onReset?: () => void;
}
type IRenderFormRes = {
  getForm: () => any;
  tpl: React.ReactNode;
};

// const useBaseForm = () => {
//   console.log("run-again");
//   return {};
// };

const createForm = ({
  columnConfig,
  initData,
  onSubmit,
  onReset,
}: IRenderForm): IRenderFormRes => {
  let handler: () => FormInstance;
  const ob = {
    handler: null,
  };
  const register = ({ getForm }) => {
    handler = getForm;
    ob.handler = getForm;
  };
  const _onSubmit = () => {
    const form = handler();
    return form
      .validate()
      .then((rs) => {
        return rs;
      })
      .catch((e) => {
        console.error(e);
      });
  };
  const IBaseRef = useRef<IBaseFormRef>(null);
  return {
    getForm: () => {
      return IBaseRef.current?.getForm();
    },
    tpl: (
      <BaseForm
        ref={IBaseRef}
        columnConfig={columnConfig}
        initData={initData}
        register={register}
        extraNode={
          <>
            <Button
              style={{
                marginLeft: "10px",
              }}
              type="primary"
              status="danger"
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
              onClick={() => {
                const form = handler();
                form.resetFields();
                onReset?.();
              }}
            >
              重置
            </Button>
          </>
        }
      />
    ),
  };
};

const useCreateForm = () => {
  return {
    createForm,
  };
};

export default useCreateForm;
