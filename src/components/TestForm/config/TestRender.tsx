import React, { useEffect } from "react";
import FormCmp from "../Form";
import columnConfig from "./formConfig";
const fakeAsync = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          field: "name",
          value: 1122,
        },
        {
          field: "type",
          value: "A",
        },
      ]);
    }, 500);
  });
};

const TestRender = ({ handler }) => {
  const [n, setN] = React.useState(0);
  const [listData, setListData] = React.useState<any[]>([]);
  console.log("testRender----");
  React.useEffect(() => {
    handler({
      count: n,
    });
  }, [n]);

  useEffect(() => {
    fakeAsync().then((rs) => {
      setListData(rs);
    });
  }, []);

  return (
    <>
      <FormCmp schemaList={columnConfig} initValues={listData} />
    </>
  );
};

export default TestRender;
