import { Box, Card, NoticeBox, Button, StackedTable, StackedTableHead, StackedTableRowHead, StackedTableCellHead, StackedTableBody, StackedTableRow, StackedTableCell, ButtonStrip } from "@dhis2/ui";
import { Link, useLocation} from "react-router-dom";
import React, { useEffect, useState } from "react";
import Preview from "../../../widgets/preview.widgets";
import { useDataEngine } from "@dhis2/app-runtime";
import { useParams } from "react-router-dom/dist";
import { StringParam, useQueryParams } from "use-query-params";

export default function TransactionPreview(props) {
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
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getTransactions(location.search.split('=')[1]);    
  }, []);

  useEffect(()=>{
    console.log(transactions)
  },[transactions])
  return (
    <div>
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
      
    </div>
  );
}
