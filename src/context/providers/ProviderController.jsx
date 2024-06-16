import React from "react";
import TransactionContextProvider from "./TransactionContextProvider";
import IPAddressContextProvider from "./IPAddressContextProvider";

export default function ProviderController({ children }) {
  return (
    <div>
      <IPAddressContextProvider>
        <TransactionContextProvider>{children}</TransactionContextProvider>
      </IPAddressContextProvider>
    </div>
  );
}
