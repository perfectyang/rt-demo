import React from "react";
import { Table, Column, HeaderCell, Cell } from "../RsuitTable/index";
import "../RsuitTable/less/index.less";
// import "./index.less";

import { mockUsers } from "../data/mock";

interface IProps {}
const FixedHeader: React.FC<IProps> = (props) => {
  const columnConfig = [
    {
      title: "id",
      dataIndex: "id",
      width: 50,
      resizable: true,
      fixed: "left",
      verticalAlign: "middle",
    },
    {
      title: "firstName",
      dataIndex: "firstName",
      width: 120,
      resizable: true,
      // fixed: "left",
      verticalAlign: "middle",
    },
    {
      title: "lastName",
      dataIndex: "lastName",
      width: 200,
      resizable: true,
      // fixed: "left",
      verticalAlign: "middle",
    },
    {
      title: "city",
      dataIndex: "city",
      width: 200,
      resizable: true,
      // fixed: "left",
      // verticalAlign: "middle",
      // fullText: true,
    },
    {
      title: "email",
      dataIndex: "email",
      width: 200,
      resizable: true,
      // fixed: "left",
      verticalAlign: "middle",
      // fullText: true,
    },
    {
      title: "company",
      dataIndex: "company",
      flexGrow: 1,
      // width: 200,
      // resizable: true,
      // fixed: "left",
      verticalAlign: "middle",
      // fullText: true,
    },
    {
      title: "street",
      dataIndex: "street",
      width: 200,
      // resizable: true,
      fixed: "right",
      verticalAlign: "middle",
      // fullText: true,
    },
  ];

  return (
    <div>
      <Table
        // height={400}
        autoHeight
        affixHeader
        cellBordered
        bordered
        rowHeight={30}
        sortType={"asc"}
        data={mockUsers(20)}
        onRowClick={(data) => {
          console.log(data);
        }}
      >
        {columnConfig.map((column, idx) => {
          const { title, dataIndex, ...ret } = column;
          return (
            <Column key={idx} {...ret}>
              <HeaderCell>{title}</HeaderCell>
              <Cell dataKey={dataIndex} />
            </Column>
          );
        })}
        {/* <Column */}
        {/*   width={70} */}
        {/*   align="center" */}
        {/*   resizable */}
        {/*   fixed="left" */}
        {/*   verticalAlign="middle" */}
        {/* > */}
        {/*   <HeaderCell>Id</HeaderCell> */}
        {/*   <Cell dataKey="id" /> */}
        {/* </Column> */}
        {/**/}
        {/* <Column width={130} verticalAlign="middle" resizable sortable> */}
        {/*   <HeaderCell>First Name</HeaderCell> */}
        {/*   <Cell dataKey="firstName" /> */}
        {/* </Column> */}
        {/**/}
        {/* <Column width={130} colSpan={2} resizable> */}
        {/*   <HeaderCell>合并</HeaderCell> */}
        {/*   <Cell dataKey="lastName" /> */}
        {/* </Column> */}
        {/**/}
        {/* <Column width={200} resizable> */}
        {/*   <HeaderCell>City</HeaderCell> */}
        {/*   <Cell dataKey="city" /> */}
        {/* </Column> */}
        {/**/}
        {/* <Column width={200} verticalAlign="middle"> */}
        {/*   <HeaderCell>Street</HeaderCell> */}
        {/*   <Cell dataKey="street" /> */}
        {/* </Column> */}
        {/**/}
        {/* <Column width={200} resizable fullText> */}
        {/*   <HeaderCell>Company</HeaderCell> */}
        {/*   <Cell dataKey="company" /> */}
        {/* </Column> */}
        {/**/}
        {/* <Column width={200}> */}
        {/*   <HeaderCell>Email</HeaderCell> */}
        {/*   <Cell dataKey="email" /> */}
        {/* </Column> */}
        {/**/}
        {/* <Column width={200}> */}
        {/*   <HeaderCell>Email</HeaderCell> */}
        {/*   <Cell dataKey="email" /> */}
        {/* </Column> */}
        {/**/}
        {/* <Column width={200}> */}
        {/*   <HeaderCell>Email</HeaderCell> */}
        {/*   <Cell dataKey="email" /> */}
        {/* </Column> */}
        {/**/}
        {/* <Column width={200} fixed="right"> */}
        {/*   <HeaderCell>Email</HeaderCell> */}
        {/*   <Cell dataKey="email" /> */}
        {/* </Column> */}
      </Table>
      <div style={{ height: 2000 }}>
        <hr />
      </div>
    </div>
  );
};
export default FixedHeader;
