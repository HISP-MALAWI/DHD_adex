import React from "react";
import TransactionContextProvider from "./TransactionContextProvider";

export default function ProviderController({ children }) {
  return (
    <div>
      <TransactionContextProvider>{children}</TransactionContextProvider>
    </div>
  );
}
