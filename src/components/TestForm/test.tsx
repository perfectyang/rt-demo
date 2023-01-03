import React, { useEffect, useRef, useState } from "react";
import { Button, Form } from "@arco-design/web-react";
import ComponentConfig from "./config";
import useDialog from "./hooks";
import ModalConfig from "./config";
import useCreateForm from "./hooks/useBaseForm";
import BaseForm from "./FormCmp/BaseForm";
import { IFormItem } from "./FormCmp/types";
import { useReactive } from "ahooks";

const RenderDemo: React.FC = () => {
  useEffect(() => {
    console.log("render111");
  }, []);

  return <span>sss</span>;
};

const fakeSync = (time) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`${Math.random()}----${time}`);
    }, time);
  });
};

const fakeSync2 = () => {
  return new Promise<any>((resolve) => {
    setTimeout(() => {
      resolve([
        {
          label: "gggooo",
          value: "ggdddd",
        },
        {
          label: "g1",
          value: "g1",
        },
      ]);
    });
  });
};
const fakeSyncOpts = () => {
  return new Promise<any>((resolve) => {
    setTimeout(() => {
      console.log("back");
      resolve([
        {
          label: "gggooo" + Math.random(),
          value: "ggdddd" + Math.random(),
        },
      ]);
    }, 500);
  });
};

const _columnConfig = (ob?): IFormItem[] => {
  console.log("render-----");
  return [
    {
      label: "name",
      field: "name",
      component: "Input",
      rules: [
        {
          required: true,
        },
      ],
      colProps: {
        span: 6,
      },
      componentProps: {
        onChange(val, ob) {
          console.log("val", val, ob);
        },
      },
    },
    {
      label: "KOL名称",
      field: "kolName",
      component: "Select",
      colProps: {
        span: 12,
      },
      rules: [
        {
          required: true,
          message: "请选择",
        },
      ],
      componentProps: {
        placeholder: "请选择",
        options: ob?.kolNameOptions ?? [
          {
            label: "我是开始的",
            value: "111",
          },
        ],
        // options: [],
        onChange: (val, { form, setOptions }) => {
          console.log("val222222", val);
          // form.setFieldValue("password", val);
          fakeSyncOpts().then((rs) => {
            setOptions({
              kolRealName: rs,
            });
          });
        },
      },
    },
    {
      label: "KOL真实名称",
      field: "kolRealName",
      component: "Select",
      colProps: {
        span: 12,
      },
      rules: [
        {
          required: true,
          message: "请选择",
        },
      ],
      componentProps: {
        placeholder: "请选择",
        options: [],
        // options: stateDicts,
        onChange: (val, { form }) => {
          console.log("val222222", val);
          // form.setFieldValue("password", val);
        },
      },
    },
  ];
};

const TestDemo = () => {
  const { openDialog, modalVisible } = useDialog();

  const renderList = () => {
    console.log("get-renderList");
  };
  const [test, setTest] = useState(0);

  const renderData = () => {
    return new Promise<any>((resolve) => {
      setTimeout(() => {
        resolve({
          name: "aa",
          password: "123123",
        });
      }, 2000);
    });
  };

  const state = useReactive({
    kolNameOptions: [],
    kolRealNameOptions: [],
  });

  const _config = React.useMemo(() => {
    console.log("data-init");
    return _columnConfig({
      ...state,
    });
  }, [_columnConfig, state.kolNameOptions, state.kolRealNameOptions]);

  const _config2 = React.useMemo(() => {
    return _columnConfig();
  }, [_columnConfig]);

  const { createForm } = useCreateForm();
  const [getForm, tpl] = createForm({
    onSubmit: (rs) => {
      console.log("render------", rs);
    },
    columnConfig: _config,
  });

  const [getForm2, tpl2] = createForm({
    onSubmit: (rs) => {
      console.log("render------", rs);
    },
    columnConfig: _config2,
  });

  useEffect(() => {
    const form = getForm();
    const form2 = getForm2();
    fakeSync2().then((rs) => {
      console.log("form", form);
      state.kolNameOptions = rs;
      // form2.setFieldValue("kolName", "aaa222");
      form.setOptions({
        kolRealName: [
          {
            label: "options-set",
            value: "aaa222",
          },
        ],
      });
    });
    fakeSyncOpts().then((rs) => {
      form2.setFieldValue("kolRealName", rs[0].value);
      form2.setOptions({
        kolRealName: rs,
      });
    });
  }, []);

  return (
    <div>
      <hr />
      111
      {tpl}
      <hr />
      222
      {tpl2}
      {/* <BaseForm
        ref={baseRef}
        initData={renderData}
        columnConfig={_columnConfig}
      /> */}
      {/* {baseform} */}
      {/* {tpl} */}
      {/* <Button
        onClick={() => {
          // console.log("form", form);
          // const form = getForm();
          // form.setOptions({
          //   live: [
          //     {
          //       label: "perfectyang",
          //       value: "000k0",
          //     },
          //   ],
          // });
        }}
      >
        click
      </Button> */}
      {test}
      <div
        onClick={() => {
          setTest((pr) => pr + 1);
        }}
      >
        test
      </div>
      <Button
        onClick={() => {
          console.log("aaaaa-----");
          openDialog(
            ModalConfig({
              modalVisible,
              initValues: {
                type: "A",
              },
            })
          );
        }}
      >
        open
      </Button>
    </div>
  );
};

export default TestDemo;
