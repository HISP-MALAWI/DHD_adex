import {
  Box,
  Card,
  NoticeBox,
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
import { Link, useLocation } from "react-router-dom";
import React, { useEffect, useState, useContext } from "react";
import Preview from "../../../widgets/preview.widgets";
import { useDataEngine } from "@dhis2/app-runtime";
import { useParams } from "react-router-dom/dist";
import { StringParam, useQueryParams } from "use-query-params";
import axios from "axios";
import DataApproval from "../Approve/DataApproval";
import TransactionById from "../../../Services/data/store/DataStoreTransactionById";
import TransactionContext from "../../../context/contexts/TransactionContext";

export default function TransactionPreview(props) {
  const { transactionById } = useContext(TransactionContext);
  const endpoint = "https://sheetdb.io/api/v1/5acdlu0ba0l47?sheet=openlmis";
  const token = "7imn7rlmh0i1psm6u09qicg6zoqnh8ujiklba87q";
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const engine = useDataEngine();
  const [payload, setPayload] = useState();
  const [transactions, setTransactions] = useState({});
  const [error, setError] = useState(true);
  const [hide, setHidden] = useState(true);
  const [message, setMessage] = useState(
    "Failled to submit payload to Globalfund"
  );
  const [openApprove, setOpenApprove] = useState(false);
  //   query params
  // const{id}=useParams();
  // const [transactionIdQuery, setTransactionIdQuery] = useQueryParams({
  //   id: StringParam,
  // });
  // const { id } = transactionIdQuery;
  //  saved transactions from datastore
  // const getTransactions = async () => {
  //   const queryParams = new URLSearchParams(location.search);
  //   JSON.parse(new URLSearchParams(location.search).get("data"));
  //   const data = JSON.parse(queryParams.get("data"));
  //   if (data == undefined || data == null || data == "") {
  //     setLoading(false);
  //     setTransactions({});
  //   } else {
  //     // console.log(data);
  //     setLoading(false);
  //     setTransactions(data?.value);
  //   }
  //   console.log(data);
  // const myQuery = {
  //   dataStore: {
  //     resource: `dataStore/OpenLMIS_SnowFlake_Intergration/${key}`,
  //     params: {
  //       paging: false,
  //       fields: ["."],
  //     },
  //   },
  // };
  // try {
  //   const res = await engine.query(myQuery);
  //   setTransactions(res?.dataStore);
  //   setLoading(false);
  // } catch (e) {
  //   setLoading(false);
  //   console.log(e);
  // }
  // };

  const submit = async () => {
    setLoading(true);
    const id = location.search.split("=")[1];
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    await axios
      .post(
        endpoint,
        JSON.stringify({
          id: transactions.id,
          user_id: transactions?.user_id,
          analytics: {
            metadata: transactions?.analytics?.metaData?.items,
            rows: transactions?.analytics?.rows,
          },
          date: new Date().toDateString(),
          name: transactions.name,
          description: transactions?.description,
        }),
        { headers }
      )
      .then(async (res) => {
        const myMutation = { ...transactions, status: "success" };
        const myQuery = {
          resource: `dataStore/OpenLMIS_SnowFlake_Intergration/${id}`,
          type: "update",
          data: myMutation,
        };
        await engine
          .mutate(myQuery)
          .then((res) => {
            setError(false);
            setMessage("Payload sucessifuly submited to Global fund");
            setHidden(false);
            getTransactions(id);
          })
          .catch((e) => {
            setLoading(false);
            setError(true);
            setHidden(false);
          });
      })
      .catch((e) => {
        setLoading(false);
        setLoading(false);
        setError(true);
        setHidden(false);
      });
  };
  const approveHandler = async (data) => {
    const path = `dataStore/OpenLMIS_SnowFlake_Intergration/${
      transactionById?.id.split("-")[1]
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
            id: props?.user?.userGroups.filter(
              (userGroup) => userGroup.name == "A_OpenLMIS SnowFlakes Approval"
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
              }
            })
            .catch((e) => {
              console.log(e);
            });
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };
  useEffect(() => {
    console.log(transactionById);
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
        <StackedTable>
          <StackedTableHead>
            <StackedTableRowHead>
              <StackedTableCellHead>Id</StackedTableCellHead>
              <StackedTableCellHead>Name</StackedTableCellHead>
              <StackedTableCellHead>Description</StackedTableCellHead>
              <StackedTableCellHead>Status</StackedTableCellHead>
              <StackedTableCellHead>Vaidation</StackedTableCellHead>
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
                    {props?.user?.userRoles.filter(
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
                    {props?.user?.userRoles.filter(
                      (user) => user.name == "A_OpenLMIS_SF_Admin"
                    )?.length > 0 && transactionById?.approved == true ? (
                      <Button primary small onClick={() => submit()}>
                        Submit
                      </Button>
                    ) : (
                      <Button primary small disabled>
                        Submit
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
