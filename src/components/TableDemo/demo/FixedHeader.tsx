import React from "react";
import {
  Table,
  Column,
  HeaderCell,
  Cell,
  SortType,
} from "../NewRsuitTable/index";
// import { Table, Column, HeaderCell, Cell, SortType } from "../RsuitTable/index";
// import "../RsuitTable/less/index.less";
import "../NewRsuitTable/less/index.less";
// import "./index.less";

import { mockUsers } from "../data/mock";

interface IProps {}
const FixedHeader: React.FC<IProps> = (props) => {
  const [data, setData] = React.useState(mockUsers(70));
  const [sortType, setSortType] = React.useState<SortType | undefined>();
  const [sortColumn, setSortColumn] = React.useState("id");
  const sortData = (sortColumn, sortType) => {
    if (sortColumn && sortType) {
      setData((preData) => {
        return preData.sort((a, b) => {
          let x = a[sortColumn];
          let y = b[sortColumn];
          if (typeof x === "string") {
            x = x.charCodeAt();
          }
          if (typeof y === "string") {
            y = y.charCodeAt();
          }
          if (sortType === "asc") {
            return x - y;
          } else if (sortType === "desc") {
            return y - x;
          } else {
            return -1;
          }
        });
      });
    }
  };
  const ref = React.useRef({});

  const _columnConfig = React.useMemo(() => {
    console.log("ref", ref);
    const ret = [
      {
        title: "id",
        dataIndex: "id",
        width: 50,
        resizable: true,
        fixed: "left",
        sortable: true,
      },
      {
        title: "firstName",
        dataIndex: "firstName",
        width: 120,
        align: "center",
        resizable: true,
        // sortable: "asc",
        fullText: true,
        // render: (rowData, idx) => {
        //   return <div>{rowData.lastName + "-" + idx}</div>;
        // },
        // fixed: "left",
      },
      {
        title: "lastName",
        dataIndex: "lastName",
        width: 200,
        resizable: true,
        sortable: true,

        // fixed: "left",
      },
      {
        title: "city",
        dataIndex: "city",
        width: 200,
        resizable: true,
        // onResize: (columnWidth, dataKey) => {
        //   console.log("columnWidth, dataKey", columnWidth, dataKey);
        // },

        // fixed: "left",
        // verticalAlign: "middle",
        // fullText: true,
      },
      {
        title: "email",
        dataIndex: "email",
        width: 200,
        resizable: true,
        align: "center",
        // fixed: "left",
        fullText: true,
      },
      {
        title: "company",
        dataIndex: "company",
        // flexGrow: 2,
        width: 200,
        resizable: true,
        // fixed: "left",
        // fullText: true,
      },
      {
        title: "操作",
        dataIndex: "operation",
        width: 200,
        // resizable: true,
        fixed: "right",
        render: (rowData, idx) => {
          return (
            <div style={{ display: "flex" }}>
              <div
                onClick={() => {
                  console.log("row", rowData);
                }}
              >
                查看
              </div>
              <div>查看2</div>
            </div>
          );
        },
        // fullText: true,
      },
    ];

    return ret.map((cur) => {
      const column: any = { ...cur };
      if (column.resizable) {
        column.onResize = (columnWidth: number, dataKey: string) => {
          ref.current[dataKey] = columnWidth;
        };
        if (ref.current[column.dataIndex] === undefined) {
          ref.current[column.dataIndex] = column.width;
        } else {
          column.width = ref.current[column.dataIndex];
        }
      }
      return {
        ...column,
      };
    });
  }, [sortType]);

  const handleSortColumn = (sortColumn, sortType) => {
    setSortColumn(sortColumn);
    setSortType(sortType);
    sortData(sortColumn, sortType);
  };

  return (
    <div>
      <Table
        // height={400}
        autoHeight
        affixHeader
        affixHorizontalScrollbar
        cellBordered
        sortColumn={sortColumn}
        bordered
        // rowHeight={30}
        sortType={sortType}
        data={data}
        onSortColumn={handleSortColumn}
        // onRowClick={(data) => {
        //   console.log(data);
        // }}
      >
        {_columnConfig.map((column, idx) => {
          const { title, dataIndex, render, ...ret } = column;
          const line = idx;
          return (
            <Column key={idx} {...ret}>
              <HeaderCell>{title}</HeaderCell>
              {render ? <Cell>{render}</Cell> : <Cell dataKey={dataIndex} />}
            </Column>
          );
        })}
      </Table>
      <div style={{ height: 2000 }}>
        <hr />
      </div>
    </div>
  );
};
export default FixedHeader;
