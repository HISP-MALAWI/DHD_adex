import React, { useEffect, useState } from "react";
import Noticebox from "../../../widgets/noticeBox.widget";
import Transactions from "../../../widgets/transactions.widget";
import { useDataEngine } from "@dhis2/app-runtime";

function Home(props) {
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

      setTransactions(res?.dataStore);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getTransactions();
  }, [transactions]);
  return (
    <div
      style={{
        padding: "20px",
      }}
    >
      {props?.initialisation != undefined ? (
        <Noticebox
          message={
            "No transaction saved at moment. Please click the initalise transaction button at the top corner"
          }
          title={"No transaction"}
        />
      ) : (
        <>
          {transactions && transactions?.length > 0 ? (
            <Transactions transactions={transactions} styles={props?.styles}/>
          ) : (
            <span style={{ color: "red", textAlign: "center" }}>
              Transactions will be Loaded here or no transations are available!
            </span>
          )}
        </>
      )}
    </div>
  );
}

export default Home;
