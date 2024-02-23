import { Button, ButtonStrip } from "@dhis2/ui";
import React from "react";
import { Link } from "react-router-dom";
import Transactions from "./transactions.widget";

export default function NavigationBar(props) {
  return (
    <div className="">
      <div
        style={{
          border: "1px solid #c4c9cc",
          padding: 8,
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div className="">DHIS2-OpenLMIS-Snowflakes</div>
        <ButtonStrip end>
          <Button primary>
            <Link
              to={{
                pathname: "initiate-transaction",
              }}
              style={{
                textDecoration: "none",
                color: "white",
              }}
            >
              Initiate transaction
            </Link>
          </Button>
        </ButtonStrip>
      </div>
      <div className="" style={{ padding: 10 }}>
        <Transactions transactions={[]} styles={props?.styles} />
      </div>
    </div>
  );
}
