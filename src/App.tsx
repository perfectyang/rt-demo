import { useEffect, useState } from "react";
import { Button, Form, FormInstance, Upload } from "@arco-design/web-react";
import TestDemo from "./TestDemo";
import React from "react";
// import FormItem from "@arco-design/web-react/es/Form/form-item";
// import { useEventListener } from "ahooks";
//

const Test = () => {
  return <div>addda</div>;
};
function App() {
  const [count, setCount] = useState(0);
  const tpl = <div>aaa</div>;
  const formRef = React.useRef<FormInstance>(null);
  const f = async () => {
    const rs = await (window as any).API.ping("我从这里来");
    console.log("rs", rs);
  };
  const RenderComponent = (props: any) => {
    console.log("props111", props);
    return <span>sss</span>;
  };

  // useEventListener('keydown', (ev) => {
  //   console.log('ev', ev)
  // });
  // useEffect(() => {
  //   const handler = () => {
  //     alert(11)
  //   }
  //   console.log('render')
  //   window.addEventListener('unload', handler)
  //   return () => {
  //     window.removeEventListener('unload', handler)
  //   }
  // }, [])
  // window.onunload = () => {
  //   const ret = new Promise((resolve) => {
  //     setTimeout(() => {
  //       resolve(1)
  //     }, 2000)
  //   })
  //   console.log('ret22')
  //   return 'goo'
  // }

  return (
    <div className="App">
      <div style={{ height: "100px" }}></div>
      {/* <Button>aaa</Button> */}
      <Form ref={formRef}>
        <Form.Item shouldUpdate noStyle>
          {(ret, ...retPrps) => {
            console.log("props", ret, retPrps);
            return (
              <Form.Item
                label="tag"
                field="tagList"
                rules={[{ required: true }]}
              >
                {(prps) => {
                  return <TestDemo {...prps} test={"aaa"} />;
                }}
              </Form.Item>
            );
          }}
        </Form.Item>
      </Form>
      <Button
        onClick={async () => {
          if (formRef.current) {
            try {
              const ret = await formRef.current?.validate();
              console.log("ret", ret);
            } catch (_) {
              console.log(formRef.current.getFieldsError());
            }
          }
        }}
        type="primary"
        style={{ marginRight: 24 }}
      >
        Submit
      </Button>
      {/* <div onClick={f}>
        hhlo222
        {tpl}
        <Test />
      </div> */}
    </div>
  );
}

export default App;
