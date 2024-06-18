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
import ProviderController from "./context/providers/ProviderController";
import ConfigurationsPage from "./Index/pages/Home/configurations";
const query = {
  me: {
    resource: "me",
    params: {
      fields: [
        "id,name,email,userRoles(id,name,displayName),userGroups(id,name,displayName)",
      ],
    },
  },
  userGroups: {
    resource: "userGroups",
    params: {
      // filter: "name:eq:A_OpenLMIS_SF_Admin",
      fields: ["id,name,displayName"],
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
                <ProviderController>
                  <Routes>
                    <Route
                      path="/"
                      element={
                        <NavigationBar styles={classes} user={data?.me} />
                      }
                      exact
                    />
                    <Route
                      path="/initiate-transaction"
                      element={
                        <InitiateTransaction data={data} styles={classes} userGroups={data?.userGroups}/>
                      }
                      exact
                    />
                    <Route
                      path="/transaction"
                      element={
                        <TransactionPreview
                          user={data?.me}
                          userGroups={data?.userGroups}
                          analytics={data}
                          styles={classes}
                        />
                      }
                      exact
                    />
                    <Route
                      path="/configurations"
                      element={
                        <ConfigurationsPage user={data?.me} styles={classes} />
                      }
                      exact
                    />
                  </Routes>
                </ProviderController>
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
