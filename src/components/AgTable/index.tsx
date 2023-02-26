import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import { render } from "react-dom";
import { AgGridReact } from "ag-grid-react"; // the AG Grid React Component

import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-alpine.css"; // Optional theme CSS
import "./index.css";

// 文档api
// https://www.ag-grid.com/javascript-data-grid/column-sizing/#column-flex

const AgTable = () => {
  const gridRef = useRef(); // Optional - for accessing Grid's API
  const [rowData, setRowData] = useState(); // Set rowData to Array of Objects, one Object per Row

  // Each Column Definition results in one Column.
  const [columnDefs, setColumnDefs] = useState([
    {
      field: "",
      rowDrag: true,
      width: 20,
      // minWidth: 170,
    },
    {
      field: "id2",
      width: 20,
      headerCheckboxSelection: true,
      checkboxSelection: true,
      showDisabledCheckboxes: true,
    },
    {
      field: "make",
      width: 120,
      // rowDrag: true,
      // resizable: true,
    },
    {
      field: "model",
      flex: 1,
      // width: 120,
    },
    {
      field: "操作",
      pinned: "right",
      cellRenderer: (params) => {
        return (
          <>
            <button
              title={params.value}
              onClick={() => {
                console.log("test", params);
              }}
            >
              开始
            </button>
            <button
              style={{ marginLeft: "10px" }}
              title={params.value}
              onClick={() => {
                console.log("test", params);
              }}
            >
              查看
            </button>
          </>
        );
      },
    },
  ]);

  // DefaultColDef sets props common to all Columns
  const defaultColDef = useMemo(
    () => ({
      // sortable: true,
      // resizable: true,
    }),
    []
  );

  const cellClickedListener = useCallback((event) => {
    console.log("cellClicked", event);
  }, []);

  useEffect(() => {
    fetch("https://www.ag-grid.com/example-assets/row-data.json")
      .then((result) => result.json())
      .then((rowData) => setRowData(rowData));
  }, []);

  // Example using Grid's API
  const buttonListener = useCallback((e) => {
    gridRef.current?.api.deselectAll();
  }, []);

  return (
    <div>
      {/* Example using Grid's API */}
      {/* <button onClick={buttonListener}>Push Me</button> */}

      {/* On div wrapping Grid a) specify theme CSS Class Class and b) sets Grid size */}
      <div
        className="ag-theme-alpine"
        style={{ width: "100vw", height: "90vh" }}
      >
        <AgGridReact
          ref={gridRef} // Ref for accessing Grid's API
          rowData={rowData} // Row Data for Rows
          columnDefs={columnDefs} // Column Defs for Columns
          defaultColDef={defaultColDef} // Default Column Properties
          animateRows={true} // Optional - set to 'true' to have rows animate when sorted
          rowDragManaged={true}
          rowSelection={"multiple"}
          suppressRowClickSelection
        />
      </div>
    </div>
  );
};

export default AgTable;
