import React, { useEffect, useState } from "react";
import Noticebox from "../../../widgets/noticeBox.widget";
import Transactions from "../../../widgets/transactions.widget";
import { useDataEngine } from "@dhis2/app-runtime";
import TransactionContext from "../../../context/contexts/TransactionContext";

function Home(props) {
  const {transactions} = useContext(TransactionContext)
  
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
