import {
  Table,
  TableBody,
  TableCell,
  TableCellHead,
  TableHead,
  TableRow,
  TableRowHead,
  Button,
  DataTable,
  DataTableRow,
  DataTableColumnHeader,
  DataTableCell,
} from "@dhis2/ui";
import React from "react";
const transactions = [
  {
    transactionId: "TRMW-LMIS789",
    dateTime: "2024-02-07T13:41:21",
    createdBy: "Pemphero Mpande",
    status: "Draft",
  },
  {
    transactionId: "TRMW-LMIS208",
    dateTime: "2024-03-02T08:41:21",
    createdBy: "Max Mkutumula",
    status: "Success",
  },
  {
    transactionId: "TRMW-LMIS994",
    dateTime: "2024-01-05T16:41:21",
    createdBy: "Harry Cane",
    status: "In Progress",
  },
  {
    transactionId: "TRMW-LMIS256",
    dateTime: "2024-02-07T13:41:21",
    createdBy: "Danny Drinkwater",
    status: "Failed",
  },
];
export default function Transactions() {
  return (
    <div>
      <DataTable scrollHeight="400px">
        <TableHead>
          <DataTableRow>
            <DataTableColumnHeader fixed top="0">
              Transaction ID
            </DataTableColumnHeader>
            <DataTableColumnHeader fixed top="0">
              Date/Time
            </DataTableColumnHeader>
            <DataTableColumnHeader fixed top="0">
              Created by
            </DataTableColumnHeader>
            <DataTableColumnHeader fixed top="0">
              Status
            </DataTableColumnHeader>
            <DataTableColumnHeader fixed top="0">
              Action
            </DataTableColumnHeader>
          </DataTableRow>
        </TableHead>
        <TableBody>
          {transactions.map((transaction, key) => {
            return (
              <DataTableRow>
                <DataTableCell>{transaction.transactionId}</DataTableCell>
                <DataTableCell>
                  {transaction.dateTime.split("T")[0]}{" "}
                  {transaction.dateTime.split("T")[1]}
                </DataTableCell>
                <DataTableCell>{transaction.createdBy}</DataTableCell>
                <DataTableCell>{transaction.status}</DataTableCell>
                <DataTableCell>
                  <span
                    style={{
                      padding: 4,
                      backgroundColor: "green",
                      borderRadius: "10%",
                      color: "whitesmoke",
                      cursor: "pointer",
                    }}
                  >
                    View
                  </span>
                </DataTableCell>
              </DataTableRow>
            );
          })}
        </TableBody>
      </DataTable>
    </div>
  );
}
