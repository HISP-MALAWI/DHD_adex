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
  Layer,
  Center,
  CircularLoader,
  NoticeBox,
} from "@dhis2/ui";
import React, { useEffect, useState, useContext } from "react";
import StatusStyleController from "../Services/data/controllers/statusStyleController";
import { Link } from "react-router-dom";
import TransactionContext from "../context/contexts/TransactionContext";
export default function Transactions({ styles }) {
  const { transactions } = useContext(TransactionContext);

  return (
    <div>
      {transactions?.length <= 0 && (
        <Layer translucent>
          <Center>
            <CircularLoader />
          </Center>
        </Layer>
      )}
      {transactions?.length > 0 ? (
        <DataTable>
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
              <DataTableColumnHeader fixed top="0"></DataTableColumnHeader>
            </DataTableRow>
          </TableHead>
          <TableBody>
            {transactions &&
              transactions?.reverse()?.map((transaction, key) => {
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
                          textTransform: "capitalize",
                          backgroundColor:
                            StatusStyleController.backGroundColor(
                              transaction?.value?.status
                            ),
                        }}
                      >
                        {transaction?.value?.status}
                      </span>
                    </DataTableCell>
                    <DataTableCell>
                      <Link
                        to={{
                          pathname: "/transaction",
                          search: `id=${transaction?.key}`,
                        }}
                      >
                        <Button secondary small>
                          View
                        </Button>
                      </Link>
                    </DataTableCell>
                  </DataTableRow>
                );
              })}
          </TableBody>
        </DataTable>
      ) : (
        <NoticeBox title="Transactions to be listed here..." />
      )}
    </div>
  );
}
