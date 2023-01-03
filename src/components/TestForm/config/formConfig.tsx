import { Input } from "@arco-design/web-react";
import React from "react";
import { IFormItem } from "../FormCmp/types";

const fakeAsync = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          label: "aaf---" + Math.random(),
          value: "ssdf",
        },
        {
          label: "aa222--" + Math.random(),
          value: "qqqsdf",
        },
      ]);
    }, 500);
  });
};

const columnConfig: IFormItem[] = [
  {
    label: "出来密码222",
    field: "type",
    component: "RadioGroup",
    rules: [
      {
        required: true,
      },
    ],
    colProps: {
      span: 12,
      // sm: 24,
      // xl: 6,
      // xxl: 4,
    },
    componentProps: {
      options: ["A", "B"],
      onChange: (val, { form, setOptions }) => {
        console.log("-----", form);
        form.setFieldsValue({
          password: val,
          live: undefined,
        });
        fakeAsync().then((rs) => {
          setOptions({
            live: rs,
          });
        });
      },
    },
  },
  {
    label: "账号",
    field: "name",
    component: "InputNumber",
    colProps: {
      span: 12,
      // sm: 24,
      // xl: 6,
      // xxl: 4,
    },
    shouldUpdate: true,
    render: (ob) => {
      console.log("ob", ob);
      return <Input value={ob.value} onChange={ob.onChange} />;
    },
    rules: [
      {
        required: true,
      },
    ],
  },
  {
    label: "密码",
    field: "password",
    component: "Input",
    rules: [
      {
        required: true,
      },
    ],
    shouldUpdate: true,
    renderCondition: (values, schema) => {
      schema.label = `密码${values.type}`;
      // return values.type === "B";
      return true;
    },
  },
  {
    label: "喜欢的人",
    field: "live",
    component: "Select",
    rules: [
      {
        required: true,
        message: "请选择",
      },
    ],
    componentProps: {
      placeholder: "请选择",
      options: [
        {
          label: "aa",
          value: "1",
        },
      ],
      onChange: (val, form) => {
        console.log("val222222", val);
        // form.setFieldValue("password", val);
      },
    },
  },
];

export default columnConfig;
