import { Box, CircularLoader,Center,Layer, NoticeBox, Button } from "@dhis2/ui";
import { Link} from "react-router-dom";
import React, { useEffect, useState } from "react";
import Preview from "../../../widgets/preview.widgets";
import { useDataEngine } from "@dhis2/app-runtime";
import { StringParam, useQueryParams } from "use-query-params";

export default function TransactionPreview(props) {
  const [loading, setLoading] = useState(true);
  const engine = useDataEngine();
  const [transactions, setTransactions] = useState([]);

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
      transactions.filter((transaction) => transaction?.value?.id == id)
    );
  }, [transactions]);

  return (
    <div>
      {loading ? (
        <Layer translucent>
          <Center>
            <CircularLoader />
          </Center>
        </Layer>
      ) : (
      <>
        <div style={{width: "100", backgroundColor: "#f1f2f5", padding: 10}}>
          <Button small primary>
            <Link to={"/"} style={{textDecoration: "none", color: "#fff"}}>Back</Link>
          </Button>
        </div>
        <div
          className=""
          style={{ display: "flex", flexDirection: "row", alignItems: "center", padding: 10, flexWrap: "wrap", justifyContent: "center", gap: 10 }}
        >
          <div>
            <NoticeBox title="Transaction Identification">
            {id}
            </NoticeBox>
          </div>
          <div className="">
            <NoticeBox title="Description">
              {transactions?.filter((transaction) => transaction?.value?.id == id)[0]?.value.description}
            </NoticeBox>
          </div>
          <div className="">
            <NoticeBox title="Creadted By:">
              {transactions?.filter((transaction) => transaction?.value?.id == id)[0]?.value.user_id.name}
            </NoticeBox>
          </div>
          <div className="">
            <NoticeBox title="Status Summary:">
              {transactions?.filter((transaction) => transaction?.value?.id == id)[0]?.value.status}
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
      </>
    )}
  </div>
  );
}
