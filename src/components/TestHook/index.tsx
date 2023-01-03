import React, { useEffect, useRef } from "react";
import { useUpdateEffect, useReactive } from "ahooks";

const RenderChild = React.memo((props) => {
  console.log("render----");
  return <span>{props.children}</span>;
});

const fakeSync = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(Math.random());
    }, 2000);
  });
};

export default function TestHook() {
  const stateRef = useRef(0);
  const data = useReactive({
    n: 0,
    options: [],
  });

  const config = React.useMemo(() => {
    console.log("render---config");
    return [
      {
        label: "aa",
        value: data.options,
      },
    ];
  }, [data.options]);

  useEffect(() => {
    fakeSync().then((rs) => {
      console.log("aaa");
      data.options = [rs];
      // config[0].label = rs;
    });
  }, []);

  useUpdateEffect(() => {
    console.log("change111");
  }, [stateRef.current]);

  useEffect(() => {
    console.log("change");
  }, [stateRef.current]);

  const tpl = React.useMemo(() => {
    return <span>a111</span>;
  }, []);

  return (
    <>
      {JSON.stringify(config)}
      {config.map((item, idx) => {
        return (
          <div key={idx}>
            {item.label}--{item.options}
          </div>
        );
      })}
      <RenderChild>{tpl}</RenderChild>
      {stateRef.current}
      {data.n}
      <div
        onClick={() => {
          stateRef.current++;
          data.n++;
        }}
      >
        click
      </div>
    </>
  );
}
