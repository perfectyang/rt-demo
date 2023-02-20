import React, { useContext, useEffect, useState } from "react";
import { Select } from "@arco-design/web-react";

const SelectOption = (props) => {
  const {
    onChange,
    options = [],
    fields = {
      label: "label",
      value: "value",
    },
    value: initValues,
  } = props;
  const [value, setValue] = useState(initValues ?? undefined);
  console.log("props", props);
  useEffect(() => {
    setValue(initValues || undefined);
  }, [initValues]);

  return (
    <Select
      placeholder="请选择"
      style={{ width: "100%", margin: "0px 5px", padding: "0px" }}
      value={value}
      size="mini"
      allowClear={props.allowClear ?? true}
      showSearch
      filterOption={(inputText, opt) => {
        return (
          opt.props.children.toLowerCase().indexOf(inputText.toLowerCase()) > -1
        );
      }}
      onChange={(value) => {
        setValue(value);
        onChange(value);
      }}
    >
      {options.map((option, index) => (
        <Select.Option
          key={`opt-${index}`}
          value={option[fields.value]}
          title={option[fields.label]}
        >
          {option[fields.label]}
        </Select.Option>
      ))}
    </Select>
  );
};

export default SelectOption;
