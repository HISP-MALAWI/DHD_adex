import { Box, Card, NoticeBox, Button, StackedTable, StackedTableHead, StackedTableRowHead, StackedTableCellHead, StackedTableBody, StackedTableRow, StackedTableCell, ButtonStrip, Layer, Center, CircularLoader } from "@dhis2/ui";
import { Link, useLocation} from "react-router-dom";
import React, { useEffect, useState } from "react";
import Preview from "../../../widgets/preview.widgets";
import { useDataEngine } from "@dhis2/app-runtime";
import { useParams } from "react-router-dom/dist";
import { StringParam, useQueryParams } from "use-query-params";
import axios from "axios";

export default function TransactionPreview(props) {
  const endpoint = " https://sheetdb.io/api/v1/5acdlu0ba0l47?sheet=openlmis";
  const token = "7imn7rlmh0i1psm6u09qicg6zoqnh8ujiklba87q"; 
  const location = useLocation()
  const [loading, setLoading] = useState(true);
  const engine = useDataEngine();
  const [transactions, setTransactions] = useState({});

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
          getTransactions(id)
        }).catch(e => {
          console.log(e)
        })
        }).catch(e => {
          setLoading(false)
          console.log(e)
        })
  }
  
  useEffect(() => {
    getTransactions(location.search.split('=')[1]);    
  }, []);
  return (
    <div>
      {loading && <Layer translucent>
        <Center>
          <CircularLoader /></Center></Layer>}
      <div style={{width: "100", display:'flex',justifyContent:'space-between', padding: 10}}>
      <Link to={"/"} style={{textDecoration: "none", color: "#fff"}}>
        <Button secondary>
          Back
        </Button>
        </Link>
        <div>
          Transaction preview
        </div>
        <div className={props?.styles?.hide}></div>
      </div>
      <div
        className=""
        style={{ display: "flex", flexDirection: "row", alignItems: "center", padding: 10, flexWrap: "wrap", justifyContent: "center", gap: 10 }}
      >
        <StackedTable>
          <StackedTableHead>
            <StackedTableRowHead>
              <StackedTableCellHead>
                Id
              </StackedTableCellHead>
              <StackedTableCellHead>
                Name
              </StackedTableCellHead>
              <StackedTableCellHead>
                Description
              </StackedTableCellHead>
              <StackedTableCellHead>
                Status
              </StackedTableCellHead>
            </StackedTableRowHead>
          </StackedTableHead>
          <StackedTableBody>
            <StackedTableRow>
              <StackedTableCell>
                {transactions?.id}
              </StackedTableCell>
              <StackedTableCell>
                {transactions?.name}
              </StackedTableCell>
              <StackedTableCell>
                {transactions?.description}
              </StackedTableCell>
              <StackedTableCell>
                {transactions?.status}
              </StackedTableCell>
            </StackedTableRow>
          </StackedTableBody>
        </StackedTable>
      </div>
      <div className="">
        {transactions?.analytics !== undefined && 
         <Preview
              analytics={transactions?.analytics
              }
              styles={props.styles}
            />
}
      </div>
      <div style={{padding : '10px'}}>
      <ButtonStrip end>
      {transactions?.status === 'draft' && <Button primary onClick={()=> submit()}>
          Submit
        </Button>}
      </ButtonStrip>
      </div>
      <div
          style={{
            position: "absolute",
            bottom: 0,
            left: "50%",
            left: "40%",
          }}
        >
          <AlertBar
            warning={error}
            success={!error}
            hidden={hide}
            onHidden={() => {
              setHidden(true)}}
            duration={2000}
          >
            {message}
          </AlertBar>
        </div>
    </div>
  );
}
