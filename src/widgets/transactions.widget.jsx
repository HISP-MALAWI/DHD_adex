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
import React, { useEffect, useState } from "react";
import StatusStyleController from "../Services/data/controllers/statusStyleController";
import { useDataEngine } from "@dhis2/app-runtime";
import { Link } from "react-router-dom";
export default function Transactions({ styles }) {
  const [loading, setLoading] = useState(true);
  const engine = useDataEngine();
  const [transactions, setTransactions] = useState([]);
  const getTransactions = async () => {
    const myQuery = {
      dataStore: {
        resource: "dataStore/OpenLMIS_SnowFlake_Intergration",
        params: {
          paging: false,
          fields: ["."],
        },
      },
    };
    try {
      const res = await engine.query(myQuery);
      if (res.dataStore == undefined || res.dataStore == null) {
        setLoading(true);
      } else {
        if (res?.dataStore?.length == 0) {
          setLoading(false);
        } else {
          setLoading(false);
          setTransactions(res?.dataStore);
        }
      }
    } catch (e) {
    }
  };
  useEffect(() => {
    getTransactions();
  }, [transactions]);

  return (
    <div>
      {loading && (
        <Layer translucent>
          <Center>
            <CircularLoader />
          </Center>
        </Layer>
      )}
      {!loading && transactions?.length > 0 ? (
        <DataTable >
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
                        <Button toggled>
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
