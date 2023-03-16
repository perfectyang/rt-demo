import React from "react";
import { useState, forwardRef } from "react";
import { Table, DatePicker } from "@arco-design/web-react";
import QuarterOfYear from "dayjs/plugin/quarterOfYear";
import originDayjs, { Dayjs, OpUnitType, UnitType } from "dayjs";
originDayjs.extend(QuarterOfYear);
const dayjs = originDayjs;
// import { Resizable } from "react-resizable";
export function padStart(string, length: number, char = " ") {
  const s = String(string);
  if (!length) {
    return s;
  }
  const newString = s.length < length ? `${char}${s}` : s;
  return newString.length < length
    ? padStart(newString, length, char)
    : newString;
}

const setSeason = (q) => {
  const date = `2023-${padStart((q - 1) * 3 + 1, 2, "0")}-01`;
  const a = new Date(date);
  console.log("a", a, date);
  return a;
};

import "./index.less";
const originColumns = [
  {
    title: "Name",
    dataIndex: "name",
    fixed: "left",
    width: 120,
  },
  {
    title: "Salary",
    dataIndex: "salary",
    width: 100,
  },
  {
    title: "Address",
    dataIndex: "address",
    width: 180,
  },
  {
    title: "Email",
    width: 180,
    dataIndex: "email",
  },
];
const data = [
  {
    key: "1",
    name: "Jane Doe",
    salary: 23000,
    address: "32 Park Road, London",
    email: "jane.doe@example.com",
  },
  {
    key: "2",
    name: "Alisa Ross",
    salary: 25000,
    address: "35 Park Road, London",
    email: "alisa.ross@example.com",
  },
  {
    key: "3",
    name: "Kevin Sandra",
    salary: 22000,
    address: "31 Park Road, London",
    email: "kevin.sandra@example.com",
  },
  {
    key: "4",
    name: "Ed Hellen",
    salary: 17000,
    address: "42 Park Road, London",
    email: "ed.hellen@example.com",
  },
  {
    key: "5",
    name: "William Smith",
    salary: 27000,
    address: "62 Park Road, London",
    email: "william.smith@example.com",
  },
];
const CustomResizeHandle = forwardRef((props, ref) => {
  const { handleAxis, ...restProps } = props;
  return (
    <span
      ref={ref}
      className={`react-resizable-handle react-resizable-handle-${handleAxis}`}
      {...restProps}
      onClick={(e) => {
        e.stopPropagation();
      }}
    />
  );
});

const ResizableTitle = (props) => {
  const { onResize, width, ...restProps } = props;

  if (!width) {
    return <th {...restProps} />;
  }

  return (
    <Resizable
      width={width}
      height={0}
      handle={<CustomResizeHandle />}
      onResize={onResize}
      draggableOpts={{
        enableUserSelectHack: false,
      }}
    >
      <th {...restProps} />
    </Resizable>
  );
};

function App() {
  const [columns, setColumns] = useState(
    originColumns.map((column, index) => {
      if (column.width) {
        return {
          ...column,
          onHeaderCell: (col) => ({
            width: col.width,
            onResize: handleResize(index),
          }),
        };
      }

      return column;
    })
  );

  function handleResize(index) {
    return (e, { size }) => {
      setColumns((prevColumns) => {
        const nextColumns = [...prevColumns];
        nextColumns[index] = { ...nextColumns[index], width: size.width };
        return nextColumns;
      });
    };
  }

  const components = {
    header: {
      th: ResizableTitle,
    },
  };
  const [val, setVal] = useState("");
  return (
    // <Table
    //   className="table-demo-resizable-column"
    //   components={components}
    //   border
    //   borderCell
    //   scroll={{ x: "100px" }}
    //   columns={columns}
    //   data={data}
    // />
    <>
      <DatePicker.QuarterPicker
        value={new Date(val.replace("Q", "0"))}
        onChange={(val) => {
          console.log("val", val);
        }}
        style={{ width: 200 }}
      />
    </>
  );
}

export default App;
