import { Box, Card, NoticeBox,AlertBar, Button, StackedTable, StackedTableHead, StackedTableRowHead, StackedTableCellHead, StackedTableBody, StackedTableRow, StackedTableCell, ButtonStrip, Layer, Center, CircularLoader } from "@dhis2/ui";
import { Link, useLocation} from "react-router-dom";
import React, { useEffect, useState } from "react";
import Preview from "../../../widgets/preview.widgets";
import { useDataEngine } from "@dhis2/app-runtime";
import { StringParam, useQueryParams } from "use-query-params";
import axios from "axios";

export default function TransactionPreview(props) {
  const endpoint = " https://sheetdb.io/api/v1/5acdlu0ba0l47?sheet=openlmis";
  const token = "7imn7rlmh0i1psm6u09qicg6zoqnh8ujiklba87q"; 
  const location = useLocation()
  const [loading, setLoading] = useState(true);
  const engine = useDataEngine();
  const [transactions, setTransactions] = useState({});
  const [error,setError] = useState(true)
  const [hide, setHidden] = useState(true);
  const [message, setMessage] = useState(
    "Failled to submit payload to Globalfund"
  );
  //   query params
  // const{id}=useParams();
  const [transactionIdQuery, setTransactionIdQuery] = useQueryParams({
    id: StringParam,
  }); 
  
  const { id } = transactionIdQuery;
  //  saved transactions from datastore
  const getTransactions = async (key) => {
    const myQuery = {
      dataStore: {
        resource: `dataStore/OpenLMIS_SnowFlake_Intergration/${key}`,
        params: {
          paging: false,
          fields: ["."],
        },
      },
    };
    try {
      const res = await engine.query(myQuery);
      setTransactions(res?.dataStore)
      setLoading(false)      
    } catch (e) {
      setLoading(false)
      console.log(e);
    }
  };

  const submit = async() => {
    setLoading(true)
    const id = location.search.split('=')[1]
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    await axios.post(endpoint,
      JSON.stringify({
        id: transactions.id,
        user_id: transactions?.user_id,
        analytics: {
          metadata: transactions?.analytics?.metaData?.items,
          rows: transactions?.analytics?.rows,
        },
        date: new Date().toDateString(),
        name: transactions.name,
        description: transactions?.description,
      }),
      { headers }).then(async res => {
        const myMutation ={ ... transactions,status : "success"}
        const myQuery = {
            resource: `dataStore/OpenLMIS_SnowFlake_Intergration/${id}`,
            type : 'update',
            data : myMutation
          }
         await engine.mutate(myQuery).then(res => {
          setError(false)
          setMessage("Payload sucessifuly submited to Global fund")
          setHidden(false)
          getTransactions(id)
        }).catch(e => {
          setLoading(false)
          setError(true)
          setHidden(false)
        })
        }).catch(e => {
          setLoading(false)
          setLoading(false)
          setError(true)
          setHidden(false)
        })
  }
  
  useEffect(() => {
    getTransactions();
    console.log(
      transactions.filter((transaction) => transaction?.value?.id == id)[0]
    );
  }, [transactions]);

  return (
    <div>
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
    </div>
  );
}
