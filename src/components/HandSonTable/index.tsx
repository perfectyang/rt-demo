import React from "react";
// import "pikaday/css/pikaday.css";
import "./styles.css";
import { HotTable, HotColumn } from "@handsontable/react";
import { data } from "./constants";

import {
  drawCheckboxInRowHeaders,
  addClassesToRows,
  changeCheckboxCell,
  alignHeaders,
} from "./hooksCallbacks";

import "handsontable/dist/handsontable.min.css";

const RendererComponent = (props) => {
  console.log(props);
  return (
    <>
      <span>{props.value}</span>
    </>
  );
};

const HandSonTable = () => {
  return (
    <div style={{ margin: "20px" }}>
      <HotTable
        data={data}
        height="500px"
        manualRowResize={true}
        colWidths={[140, 192, 100, 90, 90, 110, 97, 100, 126]}
        colHeaders={[
          "KOL账号ID",
          "个人主页",
          "粉丝数",
          "覆盖国家",
          "Qty",
          "Progress",
          "Rating",
          "Order ID",
          "Country",
        ]}
        // dropdownMenu={false}
        // hiddenColumns={{
        //   indicators: true,
        // }}
        // contextMenu={true}
        multiColumnSorting={true}
        manualColumnResize={true}
        filters={true}
        rowHeaders={true}
        afterGetColHeader={alignHeaders}
        beforeRenderer={addClassesToRows}
        afterGetRowHeader={drawCheckboxInRowHeaders}
        afterOnCellMouseDown={changeCheckboxCell}
        manualRowMove={true}
        licenseKey="non-commercial-and-evaluation"
      >
        <HotColumn data={1}>
          <RendererComponent hot-renderer />
        </HotColumn>
        <HotColumn
          data={3}
          settings={{
            title: "自定义头部",
            readOnly: true,
          }}
        />
        <HotColumn data={4} type="date" allowInvalid={false} />
        <HotColumn data={6} type="checkbox" className="htCenter" />
        <HotColumn data={7} type="numeric" />
        <HotColumn data={8} readOnly={true} className="htMiddle"></HotColumn>
        <HotColumn data={9} readOnly={true} className="htCenter"></HotColumn>
        <HotColumn data={5} />
        <HotColumn data={2} />
      </HotTable>
    </div>
  );
};

export default HandSonTable;
