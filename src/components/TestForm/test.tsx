import React, { useEffect, useRef, useState } from "react";
import { Button, Form } from "@arco-design/web-react";
import ComponentConfig from "./config";
import useDialog from "./hooks";
import ModalConfig from "./config";
import useCreateForm from "./hooks/useBaseForm";
import BaseForm from "./FormCmp/BaseForm";

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
      ]);
    }, 2000);
  });
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

  // const [selfRef, baseform] = renderForm({
  //   onSubmit: (rs) => {
  //     console.log("render------", rs);
  //   },
  //   initData: renderData,
  //   columnConfig: [
  //     {
  //       label: "name2",
  //       field: "name2",
  //       component: "Input",
  //       rules: [
  //         {
  //           required: true,
  //         },
  //       ],
  //       colProps: {
  //         span: 6,
  //       },
  //       componentProps: {
  //         onChange(val, ob) {
  //           console.log("val", val, ob);
  //         },
  //       },
  //     },
  //     {
  //       label: "name1",
  //       field: "name1",
  //       component: "Input",
  //       rules: [
  //         {
  //           required: true,
  //         },
  //       ],
  //       colProps: {
  //         span: 6,
  //       },
  //       componentProps: {
  //         onChange(val, ob) {
  //           console.log("val", val, ob);
  //         },
  //       },
  //     },
  //     {
  //       label: "name",
  //       field: "name",
  //       component: "Input",
  //       rules: [
  //         {
  //           required: true,
  //         },
  //       ],
  //       colProps: {
  //         span: 6,
  //       },
  //       componentProps: {
  //         onChange(val, ob) {
  //           console.log("val", val, ob);
  //         },
  //       },
  //     },
  //     {
  //       label: "password",
  //       field: "password",
  //       component: "Input",
  //       colProps: {
  //         span: 6,
  //       },
  //     },
  //   ],
  // });

  const [stateDicts, setStateDicts] = useState(null);

  const _columnConfig = React.useMemo(() => {
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
        label: "喜欢的人",
        field: "live",
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
          options: stateDicts,
          onChange: (val, { form, schema }) => {
            console.log("val222222", val, schema);
            // form.setFieldValue("password", val);
          },
        },
      },
    ];
  }, [stateDicts]);

  const { createForm } = useCreateForm();
  const { getForm, tpl } = createForm({
    onSubmit: (rs) => {
      console.log("render------", rs);
    },
    initData: renderData,
    columnConfig: _columnConfig,
  });
  const baseRef = useRef(null);

  useEffect(() => {
    // console.log("ref", ref);
    // console.log("baseRef", ));

    fakeSync2().then((rs) => {
      setStateDicts([...rs]);
      console.log("stateDicts.current.options", stateDicts);
    });

    // const form = baseRef.current?.getForm();
    // fakeSync(2000).then((rs) => {
    //   form.setFieldValue("name", rs);
    //   form.setOptions({
    //     live: [
    //       {
    //         label: "perfectyang",
    //         value: "000k0",
    //       },
    //     ],
    //   });
    // });
    // fakeSync(4000).then((rs) => {
    //   // form.setFieldValue("password", rs);
    // });
  }, []);

  return (
    <div>
      {/* {tpl} */}
      <BaseForm
        ref={baseRef}
        initData={renderData}
        columnConfig={_columnConfig}
      />
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
          openDialog(ModalConfig({ modalVisible }));
        }}
      >
        open
      </Button>
    </div>
  );
};

export default TestDemo;
