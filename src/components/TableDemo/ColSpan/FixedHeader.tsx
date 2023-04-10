import React from "react";
import { Table, Column, HeaderCell, Cell } from "../RsuitTable/index";
import "../RsuitTable/less/index.less";
// import "rsuite/styles/index.less";
import { mockUsers } from "../data/mock";

interface IProps {}
const FixedHeader: React.FC<IProps> = (props) => {
  const data = [
    {
      id: 1,
      // email: null,
      firstName: "Ernest Schuppe Anderson",
      // lastName: null,
      city: "New Gust",
      // companyName: null,
    },
    {
      id: 2,
      firstName: "Janis",
      lastName: null,
      city: "New Gust",
      email: null,
      companyName: "Glover - Hermiston",
    },
    {
      id: 3,
      firstName: "Makenzie Vandervort",
      lastName: null,
      city: "New Gust",
      // email: "Frieda.Sauer61@gmail.com",
      // companyName: "company",
    },
    {
      id: 4,
      email: "Eloisa.OHara@hotmail.com",
      firstName: "Ciara",
      lastName: "Towne",
      city: "Vandervort",
      companyName: "Hilpert, Eichmann and Brown",
    },
    {
      id: 5,
      email: "Brisa46@hotmail.com",
      firstName: "Suzanne",
      lastName: "Wolff",
      city: "Vandervort",
      companyName: "Mayer - Considine",
    },
    {
      id: 6,
      email: "Cody.Schultz56@gmail.com",
      firstName: "Alessandra",
      lastName: null,
      city: "Vandervort",
      companyName: "Nikolaus and Sons",
    },
    {
      id: 7,
      email: "Enrico_Beer@yahoo.com",
      firstName: "Margret",
      lastName: "Heller",
      city: "Vandervort",
      companyName: "Corwin, Maggio and Wintheiser",
    },
    {
      id: 8,
      email: "Mitchel.Herman@yahoo.com",
      firstName: "Emiliano",
      lastName: "Moore",
      city: "Gilberthaven",
      companyName: "Gulgowski - Botsford",
    },
    {
      id: 9,
      city: "Gilberthaven",
      email: "Gaylord_Reichel16@yahoo.com",
      firstName: "Alessandra",
      lastName: "Smith",
      companyName: "Maggio LLC",
    },
  ];

  return (
    <Table bordered cellBordered height={420} headerHeight={30} data={data}>
      <Column width={70} align="center">
        <HeaderCell>Id</HeaderCell>
        <Cell dataKey="id" />
      </Column>
      <Column width={130} colSpan={2}>
        <HeaderCell>First Name</HeaderCell>
        <Cell dataKey="firstName" />
      </Column>
      <Column width={130}>
        <HeaderCell>Last Name</HeaderCell>
        <Cell dataKey="lastName" />
      </Column>

      <Column width={200} colSpan={3}>
        <HeaderCell>City</HeaderCell>
        <Cell dataKey="city" />
      </Column>
      <Column width={200}>
        <HeaderCell>Email</HeaderCell>
        <Cell dataKey="email" />
      </Column>
      <Column width={200} flexGrow={1}>
        <HeaderCell>CompanyName</HeaderCell>
        <Cell dataKey="companyName" />
      </Column>
    </Table>
  );
};
export default FixedHeader;
