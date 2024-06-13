import { Button, ButtonStrip, Card } from "@dhis2/ui";
import React from "react";
import { Link } from "react-router-dom";
import Transactions from "./transactions.widget";

export default function NavigationBar(props) {
  return (
    <div className="">
      <div className="" style={{ padding: "10px" }}>
        <Card>
          <div
            style={{
              border: "1px solid #c4c9cc",
              padding: "10px",
              width: "100%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div className="">DHIS2-OpenLMIS-Snowflakes</div>
            <ButtonStrip end>
              {props &&
                props?.user?.userRoles.filter(
                  (user) => user?.name === "A_OpenLMIS_SF_Admin"
                )?.length > 0 && (
                  <Button secondary small>
                    <Link
                      to={{
                        pathname: "initiate-transaction",
                      }}
                      style={{
                        textDecoration: "none",
                        color: "black",
                      }}
                    >
                      Configuration
                    </Link>
                  </Button>
                )}
              <Button primary small>
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
        </Card>
      </div>
      <div className="" style={{ padding: 10, marginBottom: "50px" }}>
        <Transactions transactions={[]} styles={props?.styles} />
      </div>
    </div>
  );
}
