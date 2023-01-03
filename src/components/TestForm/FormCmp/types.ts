import {
  Form,
  Input,
  Button,
  Radio,
  InputNumber,
  Select,
  FormItemProps,
  FormInstance,
  Grid,
  RowProps,
  ColProps,
  FormProps,
} from "@arco-design/web-react";
import { Components } from ".";
export type IComponentKeys = keyof typeof Components;
export type IGetFormInstance = {
  form: FormInstance;
};

type keys = "label" | "field" | "rules" | "shouldUpdate";

type IFormField = Pick<FormItemProps, keys>;
type IFormFieldProps = Omit<FormItemProps, keys>;

type IRenderParam = {
  schema: IFormItem;
  setOptions: Function;
  [key: string]: any;
} & IGetFormInstance;

export type IFormItem = {
  renderCondition?: (val: any, schema: IFormItem) => boolean;
  componentProps?: {
    onChange?: (
      val: any,
      ob: {
        setOptions: (ob: Record<string, any>) => void;
        schema: IFormItem;
        values: any;
      } & IGetFormInstance
    ) => void;
    [key: string]: any;
  };
  component: IComponentKeys;
  updateComponentProp?: (val: IGetFormInstance) => any;
  rowProps?: RowProps;
  colProps?: ColProps;
  formItemProps?: IFormFieldProps;
  render?: (ob: IRenderParam) => React.ReactNode;
} & IFormField;

export interface IForm {
  initValues?: Record<string, any>;
  schemaList: IFormItem[];
  formProps?: FormProps;
  extraNode?: React.ReactNode;
}

export interface IFormCmpRef {
  getForm: () => FormInstance;
}
