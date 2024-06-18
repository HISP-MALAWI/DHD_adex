import {
  Box,
  Card,
  Field,
  TextArea,
  Modal,
  ModalTitle,
  Input,
  ModalActions,
  ModalContent,
  AlertBar,
  Button,
  StackedTable,
  StackedTableHead,
  StackedTableRowHead,
  StackedTableCellHead,
  StackedTableBody,
  StackedTableRow,
  StackedTableCell,
  ButtonStrip,
  Layer,
  Center,
  CircularLoader,
} from "@dhis2/ui";
import { Link, useNavigate, useLocation } from "react-router-dom";
import React, { useEffect, useState, useContext } from "react";
import Preview from "../../../widgets/preview.widgets";
import { useDataEngine } from "@dhis2/app-runtime";
import axios from "axios";
import DataApproval from "../Approve/DataApproval";
import TransactionContext from "../../../context/contexts/TransactionContext";
import IPAddressContext from "../../../context/contexts/IPAddressContext";
import useCrypto from "../../../Services/utilities/cryptoJs";

const crypto = new useCrypto();
export default function TransactionPreview(props) {
  const { transactionById } = useContext(TransactionContext);
  const endpoint = "https://sheetdb.io/api/v1/5acdlu0ba0l47?sheet=openlmis";
  // const token = "7imn7rlmh0i1psm6u09qicg6zoqnh8ujiklba87q";
  const navigate = useNavigate();
  const { ipAddress } = useContext(IPAddressContext);
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [openSubmit, setOpenSubmit] = useState(false);
  const [token, setToken] = useState();
  const engine = useDataEngine();
  const [payload, setPayload] = useState();
  const [error, setError] = useState(true);
  const [hide, setHidden] = useState(true);
  const [message, setMessage] = useState(
    "Failled to submit payload to Globalfund"
  );
  const [openApprove, setOpenApprove] = useState(false);

  const approveHandler = async (data) => {
    if (
      transactionById?.id != undefined ||
      transactionById?.id != null ||
      transactionById?.id != ""
    ) {
      const path = `dataStore/OpenLMIS_SnowFlake_Intergration/${
        transactionById?.id?.split("-")[1]
      }`;
      if (data?.status == "fail") {
        transactionById.approved = false;
      } else {
        transactionById.approved = true;
      }

      const dataLayout = {
        resource: path,
        type: "update",
        data: transactionById,
      };
      let mm = "";
      if (data?.comment == "" && data?.status == "success") {
        mm = "Approved, continue with submission";
      } else if (data?.comment == "" && data?.status == "fail") {
        mm = "Approval denied, check the payload values";
      } else {
        mm = data?.comment;
      }
      if (
        props?.userGroups?.userGroups?.filter(
          (userGroup) => userGroup?.name == "A_OpenLMIS_SF_Admin"
        )[0] == undefined
      ) {
        setError(true);
        setHidden(false);
        setMessage("No user group is defined to send an approval message to.");
      } else {
        const messagePayload = {
          type: "create",
          resource: "messageConversations",
          data: {
            subject:
              data.status == "fail"
                ? "OpenLMIS Payload approval failed"
                : "OpenLMIS Payload approved",
            text: mm,
            userGroups: [
              {
                id: props?.userGroups?.userGroups?.filter(
                  (userGroup) => userGroup?.name === "A_OpenLMIS_SF_Admin"
                )[0].id,
              },
            ],
          },
        };
        await engine
          .mutate(dataLayout)
          .then((res) => {
            if (res.httpStatusCode == 200 || res.httpStatusCode == 201) {
              engine
                .mutate(messagePayload)
                .then((res) => {
                  if (res.httpStatusCode == 200 || res.httpStatusCode == 201) {
                    console.log(res);
                    setError(false);
                    setHidden(false);
                    setMessage("Successful, and message sent for submission.");
                  }
                })
                .catch((e) => {
                  console.log(e);
                  setError(true);
                  setHidden(false);
                  setMessage(
                    "Approved Successfully, but failed to send approval message."
                  );
                });
            }
          })
          .catch((e) => {
            console.log(e);
          });
      }
    }
  };

  const transformation = () => {
    let facilities = [];
    payload.map((val) => {
      let facilityCode = val.facilityCode;
      let values = [];
      val.values.map((v) => {
        values.push(...v.values);
      });
      facilities.push({
        facilityCode: facilityCode,
        values: values,
      });
    });
    return {
      description: transactionById?.description,
      reportingUnit: "MWI",
      facilities: facilities,
    };
  };

  //pushing the to dataStore
  const pushToDataStore = async (state) => {
    transactionById.status = state;
    const myMutation = {
      resource: `dataStore/OpenLMIS_SnowFlake_Intergration/${
        transactionById.id.split("-")[1]
      }`,
      type: "update",
      data: transactionById,
    };
    await engine
      .mutate(myMutation)
      .then((res) => {
        if (res.httpStatusCode == 200 || res.httpStatusCode == 201) {
          setError(false);
          setMessage("Transaction successifuly updated to Datastore");
          setHidden(false);
          setTimeout(() => navigate("/"), 3000);
        }
      })
      .catch((e) => {
        setError(true);
        setMessage("failed to save transaction to DataStore");
        setHidden(false);
      });
    setLoading(false);
  };

  //this function sends data to Mediator application
  const pushToIL = async () => {
    // const endpoint = "http://3.139.98.58:7000/";
    const py = transformation();
    const headers = {
      "Access-Control-Allow-Origin": "*",
    };
    if (
      ipAddress?.address == undefined ||
      ipAddress?.address == null ||
      ipAddress?.address == ""
    ) {
      // console.log({ IP: ipAddress });
    } else {
      let ip = ipAddress && crypto.decrypt(ipAddress?.address);
      if (ip == null || ip == undefined || ip == "") {
      } else {
        await axios
          .post(
            ip,
            py
            //{headers}
          )
          .then((res) => {
            setError(false);
            setMessage("Data sucessifuly submit to Global fund");
            setHidden(false);
            pushToDataStore("success");
          })
          .catch((e) => {
            setError(true);
            setMessage(
              "Failled to submit data to datastore please try again some time"
            );
            setHidden(false);
            pushToDataStore("failed");
          });
      }
    }
  };

  const submit = async () => {
    // setLoading(true);
    pushToIL();
  };
  useEffect(() => {
    console.log(
      props?.userGroups?.userGroups?.filter(
        (userGroup) => userGroup?.name === "A_OpenLMIS_SF_Admin"
      )[0].id
    );
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
            {/* <div className={props?.styles?.hide}></div> */}
            <div>Transaction Preview</div>
          </div>
        </Card>
      </div>
      <div
        className=""
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          padding: 10,
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 10,
        }}
      >
        {openApprove &&
          props.analytics?.me?.userRoles.filter(
            (user) => user.name == "A_OpenLMIS SnowFlakes Approval"
          )?.length > 0 && (
            <DataApproval
              transaction={transactionById}
              setOpenApprove={setOpenApprove}
              openApprove={openApprove}
              approveHandler={approveHandler}
            />
          )}

        {openSubmit && (
          <Modal onClose={() => setOpenSubmit(false)}>
            <ModalTitle>Destination User Authentication Token</ModalTitle>
            <ModalContent>
              <ModalTitle>
                IP Address: {crypto.decrypt(ipAddress?.address)}
              </ModalTitle>
              <Field label="Token">
                <Input name="token" onChange={(e) => setToken(e.value)} />
              </Field>
            </ModalContent>
            <ModalActions>
              <ButtonStrip end>
                <Button onClick={() => setOpenSubmit(false)}>Cancel</Button>
                <Button
                  primary
                  onClick={() => {
                    setOpenSubmit(false);
                    submit("success");
                  }}
                >
                  Submit
                </Button>
              </ButtonStrip>
            </ModalActions>
          </Modal>
        )}
        <StackedTable>
          <StackedTableHead>
            <StackedTableRowHead>
              <StackedTableCellHead>Id</StackedTableCellHead>
              <StackedTableCellHead>Name</StackedTableCellHead>
              <StackedTableCellHead>Description</StackedTableCellHead>
              <StackedTableCellHead>Status</StackedTableCellHead>
              <StackedTableCellHead>Validation</StackedTableCellHead>
              <StackedTableCellHead>Submit</StackedTableCellHead>
            </StackedTableRowHead>
          </StackedTableHead>
          <StackedTableBody>
            <StackedTableRow>
              <StackedTableCell>{transactionById?.id}</StackedTableCell>
              <StackedTableCell>{transactionById?.name}</StackedTableCell>
              <StackedTableCell>
                {transactionById?.description}
              </StackedTableCell>
              <StackedTableCell>{transactionById?.status}</StackedTableCell>
              <StackedTableCell>
                <ButtonStrip start>
                  <div className="" style={{ paddingTop: "10px" }}>
                    {props?.user?.userGroups.filter(
                      (user) => user.name == "A_OpenLMIS SnowFlakes Approval"
                    )?.length > 0 ? (
                      <Button basic onClick={() => setOpenApprove(true)} small>
                        Approve
                      </Button>
                    ) : (
                      "You cannot approve the transaction, contact admin"
                    )}
                  </div>
                </ButtonStrip>
              </StackedTableCell>
              <StackedTableCell>
                <ButtonStrip start>
                  <div style={{ paddingTop: "10px" }}>
                    {props?.user?.userGroups.filter(
                      (user) => user.name == "A_OpenLMIS_SF_Admin"
                    )?.length > 0 && transactionById?.approved == true ? (
                      <Button primary small onClick={() => setOpenSubmit(true)}>
                        Submit
                      </Button>
                    ) : (
                      <Button primary small disabled>
                        Not a valid user group or no destination url found
                      </Button>
                    )}
                  </div>
                </ButtonStrip>
              </StackedTableCell>
            </StackedTableRow>
          </StackedTableBody>
        </StackedTable>
      </div>
      <div className="" style={{ marginBottom: "100px", padding: "10px" }}>
        {transactionById?.analytics !== undefined && (
          <Preview
            analytics={transactionById?.analytics}
            styles={props.styles}
            setPayload={setPayload}
          />
        )}
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
