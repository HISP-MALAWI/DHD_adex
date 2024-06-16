import { useDataEngine } from "@dhis2/app-runtime";
import React, { useState, useEffect } from "react";
import TransactionContext from "../contexts/TransactionContext";
import { Link, useLocation } from "react-router-dom";
import TransactionsController from "../../Services/data/store/DataStoreTransactionById";

export default function TransactionContextProvider({ children }) {
  const [transactions, setTransactions] = useState({});
  const [transactionById, setTransactionById] = useState({});
  const location = useLocation();
  const engine = useDataEngine();

  const getTransactions = async () => {
    const data = TransactionsController.getTransactions(engine);
    const res = await data;
    if (res?.error == false) {
      setTransactions(res.data);
    } else {
    }
  };

  const getTransactionById = async () => {
    const data = TransactionsController.getTransactionById(engine, location);
    const res = await data;
    // console.log(res);
    if (res?.error == false) {
      setTransactionById(res.data);
    } else {
    }
  };
  useEffect(() => {
    getTransactions();
    getTransactionById();
  }, []);
  return (
    <TransactionContext.Provider value={{ transactionById, transactions }}>
      {children}
    </TransactionContext.Provider>
  );
}
