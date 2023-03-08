import React from "react";
import { Table, Column, HeaderCell, Cell } from "../RsuitTable/index";
import "../RsuitTable/less/index.less";
// import "rsuite/styles/index.less";
import { mockUsers } from "../data/mock";
import { Tooltip } from "@arco-design/web-react";

interface IProps {}
const data = mockUsers(5);
const BaseCell = React.forwardRef((props, ref) => {
  const { children, rowData, ...rest } = props;
  return (
    <Cell
      ref={ref}
      rowData={rowData}
      onDoubleClick={() => {
        console.log(rowData);
      }}
      {...rest}
    >
      {children}
    </Cell>
  );
});

const CheckCell = ({ rowData, onChange, checkedKeys, dataKey, ...props }) => {
  return (
    <BaseCell {...props} style={{ padding: 0 }}>
      <div style={{ lineHeight: "30px" }}>
        <input
          type="checkbox"
          value={rowData[dataKey]}
          onChange={onChange}
          checked={checkedKeys.some((item) => item === rowData[dataKey])}
        />
      </div>
    </BaseCell>
  );
};

const NameCell = ({ rowData, dataKey, ...props }) => {
  const speaker = (
    <div>
      <p>
        <b>Name:</b> {`${rowData.firstName} ${rowData.lastName}`}{" "}
      </p>
      <p>
        <b>Email:</b> {rowData.email}{" "}
      </p>
      <p>
        <b>Company:</b> {rowData.company}{" "}
      </p>
      <p>
        <b>Sentence:</b> {rowData.sentence}{" "}
      </p>
    </div>
  );

  return (
    <BaseCell rowData={rowData} {...props}>
      <Tooltip placement="top" content={speaker}>
        <a>{rowData[dataKey].toLocaleString()}</a>
      </Tooltip>
    </BaseCell>
  );
};

const ActionCell = ({ rowData, dataKey, ...props }) => {
  function handleAction() {
    alert(`id:${rowData[dataKey]}`);
    console.log(rowData, dataKey);
  }

  return (
    <BaseCell {...props}>
      <a onClick={handleAction}> Edit </a>|
      <a onClick={handleAction}> Remove </a>
    </BaseCell>
  );
};

const InputCell = React.memo(({ rowData, data, value, onChange, ...props }) => {
  function handleChange(event) {
    onChange(rowData.id, event.target.value);
  }

  return (
    <BaseCell {...props}>
      <input value={data[rowData.id]} onChange={handleChange} />
    </BaseCell>
  );
});

// const data = mockUsers(1000);
const CustomCell = () => {
  const [checkedKeys, setCheckedKeys] = React.useState([]);
  const [emailList, setEmailList] = React.useState(
    data.map((item) => item.email)
  );

  const handleCheckAll = React.useCallback((event) => {
    const checked = event.target.checked;
    const keys = checked ? data.map((item) => item.id) : [];
    setCheckedKeys(keys);
  }, []);

  const handleCheck = React.useCallback(
    (event) => {
      const checked = event.target.checked;
      const value = +event.target.value;
      const keys = checked
        ? [...checkedKeys, value]
        : checkedKeys.filter((item) => item !== value);

      setCheckedKeys(keys);
    },
    [checkedKeys]
  );

  const handleEmailChange = React.useCallback((id, value) => {
    setEmailList((prevEmailList) => {
      const nextMailList = [...prevEmailList];
      nextMailList[id] = value;
      return nextMailList;
    });
  }, []);

  const [columnWidths, setColumnWidths] = React.useState({
    id: 80,
    firstName: 150,
    lastName: 150,
    email: 300,
  });

  const handleColumnResize = (columnWidth, dataKey) => {
    setColumnWidths((prevColumnWidths) => {
      const nextColumnWidths = { ...prevColumnWidths };
      nextColumnWidths[dataKey] = columnWidth;
      return nextColumnWidths;
    });
  };

  return (
    <Table height={400} data={data} headerHeight={50} virtualized>
      <Column width={50} align="center">
        <HeaderCell style={{ padding: 0 }}>
          <div style={{ lineHeight: "40px" }}>
            <input
              type="checkbox"
              onChange={handleCheckAll}
              checked={checkedKeys.length === data.length}
            />
          </div>
        </HeaderCell>
        <CheckCell
          dataKey="id"
          checkedKeys={checkedKeys}
          onChange={handleCheck}
        />
      </Column>
      <Column
        width={columnWidths.id}
        align="center"
        resizable
        onResize={handleColumnResize}
      >
        <HeaderCell>Id</HeaderCell>
        <Cell dataKey="id" />
      </Column>
      <Column
        width={columnWidths.firstName}
        resizable
        onResize={handleColumnResize}
      >
        <HeaderCell>First Name</HeaderCell>
        <NameCell dataKey="firstName" />
      </Column>
      <Column
        width={columnWidths.lastName}
        resizable
        onResize={handleColumnResize}
      >
        <HeaderCell>Last Name</HeaderCell>
        <BaseCell dataKey="lastName" />
      </Column>

      <Column
        width={columnWidths.email}
        resizable
        onResize={handleColumnResize}
      >
        <HeaderCell>Email</HeaderCell>
        <InputCell
          dataKey="email"
          data={emailList}
          onChange={handleEmailChange}
        />
      </Column>

      <Column width={200}>
        <HeaderCell>Action</HeaderCell>
        <ActionCell dataKey="id" />
      </Column>
    </Table>
  );
};
export default CustomCell;
