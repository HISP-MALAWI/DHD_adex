import { useDataEngine } from "@dhis2/app-runtime";
import React, { useState, useEffect } from "react";
import TransactionsController from "../../Services/data/store/DataStoreTransactionById";
import IPAddressContext from "../contexts/IPAddressContext";

export default function IPAddressContextProvider({ children }) {
  const [ipAddress, setIpAddress] = useState({});
  const engine = useDataEngine();

  const getIPAddress = async () => {
    const data = TransactionsController.getIPAddress(engine);
    const res = await data;
    if (res?.error == false) {
      setIpAddress(res.data);
    } else {
    }
  };

  useEffect(() => {
    getIPAddress();
  }, []);
  return (
    <IPAddressContext.Provider value={{ ipAddress }}>
      {children}
    </IPAddressContext.Provider>
  );
}
