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
import React, { useEffect } from "react";
import StatusStyleController from "../Services/data/controllers/statusStyleController";
export default function Transactions({ transactions }) {
  useEffect(() => {
    console.log(transactions);
  }, [transactions]);
  return (
    <div>
      <DataTable scrollHeight="400px">
        <TableHead>
          <DataTableRow>
            <DataTableColumnHeader fixed top="0">
              Transaction ID
            </DataTableColumnHeader>
            <DataTableColumnHeader fixed top="0">
              Date-Time
            </DataTableColumnHeader>
            <DataTableColumnHeader fixed top="0">
              Created By
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
          {transactions &&
            transactions?.map((transaction, key) => {
              return (
                <DataTableRow key={key}>
                  <DataTableCell>{transaction?.value?.id}</DataTableCell>
                  <DataTableCell>{transaction?.value?.date}</DataTableCell>
                  <DataTableCell>
                    {transaction?.value?.user_id?.name}
                  </DataTableCell>
                  <DataTableCell>
                    <span
                      style={{
                        display: "flex",
                        padding: 4,
                        borderRadius: "5px",
                        color: "white",
                        width: "100px",
                        minWidth: "100px",
                        textAlign: "center",
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                        textTransform:"capitalize",
                        backgroundColor: StatusStyleController.backGroundColor(
                          transaction?.value?.status
                        ),
                      }}
                    >
                      {transaction?.value?.status}
                    </span>
                  </DataTableCell>
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
