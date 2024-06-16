import {
  Box,
  Card,
  Chip,
  AlertBar,
  Button,
  Field,
  Input,
  Layer,
  Center,
  CircularLoader,
} from "@dhis2/ui";
import { Link, useLocation } from "react-router-dom";
import React, { useEffect, useState, useContext } from "react";
import { useDataEngine } from "@dhis2/app-runtime";
import useCrypto from "../../../Services/utilities/cryptoJs";
import IPAddressContext from "../../../context/contexts/IPAddressContext";

const crypto = new useCrypto();
export default function ConfigurationsPage({ user }) {
  const { ipAddress } = useContext(IPAddressContext);
  const [loading, setLoading] = useState(true);
  const engine = useDataEngine();
  const [error, setError] = useState(true);
  const [ipAddressValue, setIpAddressValue] = useState({});
  const path = `dataStore/OpenLMIS_SnowFlake_Intergration_Protocol/protocol`;
  const [hide, setHidden] = useState(true);
  const [message, setMessage] = useState(
    "Failled to submit payload to Globalfund"
  );
  const updateIpAddress = async ({ user }) => {
    if (
      ipAddressValue == "" ||
      ipAddressValue == undefined ||
      ipAddressValue == null
    ) {
    } else {
      let encryptedId = crypto.encrypt(ipAddressValue);

      try {
        // Attempt to read the data
        const result = await engine.query({
          resource: path,
          params: {
            field: ["id,name"],
          },
        });
        // const ipAddressUpdatePayload = {
        //   resource: path,
        //   type: "update",
        //   data: {
        //     address: encryptedId,
        //     created: "",
        //     updated: new Date().toDateString(),
        //     createdby: user,
        //   },
        // };
        // await engine
        //   .mutate(ipAddressUpdatePayload)
        //   .then((res) => {
        //     if (res.httpStatusCode == 200 || res.httpStatusCode == 201) {
        //       console.log(res);
        //     }
        //   })
        //   .catch((e) => {
        //     console.log({ e, error });
        //   });
        // If the 'read' operation is successful, the namespace and key exist
        console.log(result);
      } catch (error) {
        const ipAddressCreatePayload = {
          resource: path,
          type: "create",
          data: {
            address: encryptedId,
            createdAt: new Date().toDateString(),
            updatedAt: new Date().toDateString(),
            createdby: user,
            updated: user,
          },
        };
        await engine
          .mutate(ipAddressCreatePayload)
          .then((res) => {
            if (res.httpStatusCode == 200 || res.httpStatusCode == 201) {
              console.log(res);
            }
          })
          .catch((e) => {
            console.log({ e, error });
          });
      }
    }
  };

  useEffect(() => {
    console.log(ipAddress);
  });
  return (
    <div>
      {!loading && (
        <Layer translucent>
          <Center>
            <CircularLoader />
          </Center>
        </Layer>
      )}
      <div className="" style={{ padding: "10px" }}>
        <Card>
          <div
            style={{
              width: "100",
              display: "flex",
              justifyContent: "space-between",
              padding: 10,
              alignItems: "center",
            }}
          >
            <Link to={"/"} style={{ textDecoration: "none", color: "#fff" }}>
              <Button secondary>Back</Button>
            </Link>

            <div>Configurations</div>
          </div>
        </Card>
      </div>
      <div className="" style={{ padding: "10px" }}>
        <Card>
          <div
            style={{
              width: "100",
              padding: "10px",
            }}
          >
            {user?.userRoles.filter(
              (user) => user.name == "A_OpenLMIS_SF_Admin"
            )?.length > 0 ? (
              <div className="">
                <div className="" style={{ marginBottom: "10px" }}>
                  <span>
                    Current Destination Ip Address:
                    <Chip>
                      {(ipAddress != undefined ||
                        ipAddress != "" ||
                        ipAddress != null) &&
                        crypto.decrypt(ipAddress?.address)}
                    </Chip>
                  </span>
                </div>
                <div
                  className=""
                  style={{ marginBottom: "10px", width: "500px" }}
                >
                  <Field label="Destination Ip Address">
                    <Input onChange={(e) => setIpAddressValue(e.value)} />
                  </Field>
                </div>
                <Button small primary onClick={updateIpAddress}>
                  Update
                </Button>
              </div>
            ) : (
              <span style={{ color: "black" }}>
                You are not authorized to change configurations. Contact admin.
              </span>
            )}
          </div>
        </Card>
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: "50%",
          left: "40%",
        }}
      >
        <AlertBar
          warning={error}
          success={!error}
          hidden={hide}
          onHidden={() => {
            setHidden(true);
          }}
          duration={2000}
        >
          {message}
        </AlertBar>
      </div>
    </div>
  );
}
