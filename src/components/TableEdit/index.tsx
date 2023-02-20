import {
  Table,
  Form,
  InputNumber,
  Message,
  Button,
} from "@arco-design/web-react";
import React, { useContext, useState } from "react";
import { useReactive } from "ahooks";
import SelectOption from "../SelectOption";
import { ClearRadioGroupContext } from "@arco-design/web-react/es/Radio";

const FormItem = Form.Item;
const EditableContext = React.createContext<{ getForm?: () => any }>({});

const columnConfig = (ob) => {
  return [
    {
      id: 1,
      title: "任务类型",
      width: 100,
      dataIndex: "test",
      align: "center",
    },
    {
      id: 2,
      title: "任务类型2",
      width: 100,
      dataIndex: "test2",
      align: "center",
    },
    {
      id: 3,
      title: "任务类型3",
      width: 100,
      dataIndex: "test3",
      align: "center",
    },
  ];
};

function EditableRow(props) {
  const { children, record, className, ...rest } = props;
  const refForm = React.useRef(null);
  const getForm = () => refForm.current;
  return (
    <EditableContext.Provider
      value={{
        getForm,
      }}
    >
      <Form
        style={{ display: "table-row" }}
        children={children}
        ref={refForm}
        wrapper="tr"
        wrapperProps={rest}
        className={`${className} editable-row`}
      />
    </EditableContext.Provider>
  );
}

function EditableCell(props) {
  const { rowData, column, onHandleSave, children } = props;
  const { getForm } = useContext(EditableContext);
  const cellValueChangeHandler = (value) => {
    const form = getForm?.();
    form?.validate([column.dataIndex], (errors, values) => {
      if (!errors || !errors[column.dataIndex]) {
        onHandleSave && onHandleSave({ ...rowData, ...values, column });
      }
    });
  };
  if (column.editing) return children;
  if (column.dataIndex === "test") {
    return children;
  }

  return (
    <FormItem
      style={{ marginBottom: 0 }}
      labelCol={{ span: 0 }}
      wrapperCol={{ span: 24 }}
      initialValue={rowData[column.dataIndex]}
      field={column.dataIndex}
      rules={[{ required: true }]}
    >
      {column.dataIndex === "test2" ? (
        <SelectOption
          options={[
            {
              label: "one",
              value: "one",
            },
            {
              label: "one22",
              value: "one222",
            },
          ]}
          onChange={(val) => {
            console.log("val", val);
            cellValueChangeHandler(val);
          }}
        />
      ) : (
        <InputNumber
          style={{ width: "100%" }}
          size="mini"
          min={0}
          step={1}
          precision={0}
          onChange={cellValueChangeHandler}
        />
      )}
    </FormItem>
  );
}

const AddTaskList = (props) => {
  const state = useReactive<{
    taskInfoList: any[];
    tableData: any[];
    loading: boolean;
    dicts: Record<string, any[]>;
  }>({
    taskInfoList: [],
    tableData: [
      {
        id: "1",
        test: "11",
        test2: "one",
        test3: "22",
      },
      {
        id: "2",
        test: "11",
        test2: "one222",
        test3: "aasdf",
      },
    ],
    loading: false,
    dicts: {},
  });

  const _columns = React.useMemo(() => {
    return columnConfig({ state });
  }, []);

  const [editing, setEditing] = useState(true);
  const handleSave = (row) => {
    const newData = [...JSON.parse(JSON.stringify(state.tableData))];
    const index = newData.findIndex((item) => row.id === item.id);
    newData.splice(index, 1, { ...newData[index], ...row });
    state.tableData = [...newData];
  };

  const { getForm } = useContext(EditableContext);
  const check = () => {
    const form = getForm?.();
    console.log("form", form);
    form?.validate((errors, values) => {
      console.log("eerrr", values);
    });
  };
  return (
    <div>
      <Table
        scroll={{ y: "calc(100vh - 200px)" }}
        columns={_columns.map((column) => ({
          ...column,
          editing,
          onCell: () => ({
            onHandleSave: (val) => {
              handleSave(val);
            },
          }),
        }))}
        rowKey="id"
        data={state.tableData}
        pagination={false}
        components={{
          body: {
            row: EditableRow,
            cell: EditableCell,
          },
        }}
        size="small"
        border={{ wrapper: true, cell: true }}
      />
      <div>
        <Button
          onClick={() => {
            console.log("sate", state.tableData);
            check();
          }}
        >
          save
        </Button>
        <Button
          onClick={() => {
            setEditing((bool) => !bool);
          }}
        >
          edit
        </Button>
      </div>
    </div>
  );
};

export default AddTaskList;
