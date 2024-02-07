import {
  Table,
  TableBody,
  TableCell,
  TableCellHead,
  TableHead,
  TableRow,
  TableRowHead,
  Button,
} from "@dhis2/ui";
import React from "react";
const transactions = [
  {
    transactionId: "1",
    dateTime: "2024-02-07T13:41:21",
    createdBy: "Pemphero Mpande",
    status: "Draft",
  },
  {
    transactionId: "2",
    dateTime: "2024-03-02T08:41:21",
    createdBy: "Max Mkutumula",
    status: "Success",
  },
  {
    transactionId: "3",
    dateTime: "2024-01-05T16:41:21",
    createdBy: "Harry Cane",
    status: "In Progress",
  },
  {
    transactionId: "4",
    dateTime: "2024-02-07T13:41:21",
    createdBy: "Danny Drinkwater",
    status: "Failed",
  },
];
export default function Transactions() {
  return (
    <div>
      <Table>
        <TableHead>
          <TableRowHead>
            <TableCellHead>Transaction ID</TableCellHead>
            <TableCellHead>Date/Time</TableCellHead>
            <TableCellHead>Created by</TableCellHead>
            <TableCellHead>Status</TableCellHead>
            <TableCellHead>Action</TableCellHead>
          </TableRowHead>
        </TableHead>
        <TableBody>
          {transactions.map((transaction, key) => {
            return (
              <TableRow>
                <TableCell>{transaction.transactionId}</TableCell>
                <TableCell>
                  {transaction.dateTime.split("T")[0]}{" "}
                  {transaction.dateTime.split("T")[1]}
                </TableCell>
                <TableCell>{transaction.createdBy}</TableCell>
                <TableCell>{transaction.status}</TableCell>
                <TableCell dense>
                  <Button> View</Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
