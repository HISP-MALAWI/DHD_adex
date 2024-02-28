import React from "react";
import { DataQuery } from "@dhis2/app-runtime";
import i18n from "@dhis2/d2-i18n";
import classes from "./App.module.css";
import { Center, CircularLoader, Layer } from "@dhis2/ui";
import Index from "./Index/Index";
import NavigationBar from "./widgets/NavigationBar";
import { ReactRouter6Adapter } from "use-query-params/adapters/react-router-6";
import { HashRouter, Routes, Route, BrowserRouter } from "react-router-dom";
import { QueryParamProvider } from "use-query-params";
import InitiateTransaction from "./Index/pages/initiateTransaction";
import TransactionPreview from "./Index/pages/Home/transactionpreview";
const query = {
  me: {
    resource: "me",
    params: {
      fields: ["id,name,email"],
    },
  },
  dataStore: {
    resource: "dataStore",
    params: {
      paging: false,
      fields: ["*"],
    },
  },
  
};

const MyApp = ({ router: Router }) => (
  <div>
    <DataQuery query={query}>
      {({ error, loading, data }) => {
        if (error) return <span>{error}</span>;
        if (loading)
          return (
            <Layer translucent>
              <Center>
                <CircularLoader />
              </Center>
            </Layer>
          );
        return (
          <div>
            {/* <Index data={data} styles={classes} /> */}
            <Router>
              <QueryParamProvider
                adapter={ReactRouter6Adapter}
                ReactRouterRoute={Route}
              >
                <Routes>
                  <Route
                    path="/"
                    element={<NavigationBar styles={classes} />}
                    exact
                  />
                  <Route
                    path="/initiate-transaction"
                    element={
                      <InitiateTransaction data={data} styles={classes} />
                    }
                    exact
                  />
                  <Route
                    path="/transaction"
                    element={
                      <TransactionPreview analytics={data} styles={classes} />
                    }
                    exact
                  />
                </Routes>
              </QueryParamProvider>
            </Router>
          </div>
        );
      }}
    </DataQuery>
  </div>
);
MyApp.defaultProps = {
  router: HashRouter,
};
export default MyApp;
