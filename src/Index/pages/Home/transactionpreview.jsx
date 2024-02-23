import { Box, Card, NoticeBox } from "@dhis2/ui";
import React, { useEffect, useState } from "react";
import Preview from "../../../widgets/preview.widgets";
import { useDataEngine } from "@dhis2/app-runtime";
import { useParams } from "react-router-dom/dist";
import { StringParam, useQueryParams } from "use-query-params";

export default function TransactionPreview(props) {
  const [loading, setLoading] = useState(true);
  const engine = useDataEngine();
  const [transactions, setTransactions] = useState([]);

  //   query params
  // const{id}=useParams();
  const [transactionIdQuery, setTransactionIdQuery] = useQueryParams({
    id: StringParam,
  });
  const { id } = transactionIdQuery;
  //  saved transactions from datastore
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
      console.log(e);
    }
  };
  useEffect(() => {
    getTransactions();
    console.log(
      transactions.filter((transaction) => transaction?.value?.id == id)[0]
    );
  }, [transactions]);

  return (
    <div>
      <div
        className=""
        style={{ display: "flex", flexDirection: "row", gap: 10, padding: 10 }}
      >
        <div>
          <NoticeBox title="Transaction Identification">
            Data shown in this dashboard may take a few hours to update.
            Scheduled dashboard updates can be managed in the scheduler app.
          </NoticeBox>
        </div>
        <div className="">
          <NoticeBox title="Description">
            Data shown in this dashboard may take a few hours to update.
            Scheduled dashboard updates can be managed in the scheduler app.
          </NoticeBox>
        </div>
        <div className="">
          <NoticeBox title="Creadted By:">
            Data shown in this dashboard may take a few hours to update.
            Scheduled dashboard updates can be managed in the scheduler app.
          </NoticeBox>
        </div>
        <div className="">
          <NoticeBox title="Status Summary:">
            Data shown in this dashboard may take a few hours to update.
            Scheduled dashboard updates can be managed in the scheduler app.
          </NoticeBox>
        </div>
      </div>
      <div className="">
        {transactions.filter(
          (transaction) => transaction?.value?.id == id
        )[0] == null ||
          (transactions.filter(
            (transaction) => transaction?.value?.id == id
          )[0] == undefined ? (
            <spa></spa>
          ) : (
            <Preview
              analytics={
                transactions.filter(
                  (transaction) => transaction?.value?.id == id
                )[0]?.value?.analytics
              }
              styles={props.styles}
            />
          ))}
      </div>
    </div>
  );
}
