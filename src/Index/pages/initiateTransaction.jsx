import {
  AlertBar,
  Button,
  ButtonStrip,
  Center,
  CircularLoader,
  Field,
  Input,
  Layer,
  TextArea,
  Modal,
  ModalTitle,
  ModalActions,
  ModalContent,
} from "@dhis2/ui";
import React, { useState, useEffect } from "react";
import EditModal from "../../widgets/editModal.widget";
import Preview from "../../widgets/preview.widgets";
import { useDataEngine } from "@dhis2/app-runtime";
import GetAnalytics from "../../Services/data/store/analytics";
import Noticebox from "../../widgets/noticeBox.widget";
import { Link, Navigate, Route, Router, useNavigate } from "react-router-dom";
import axios from "axios";

const myQuery = {
  dataElementGroups: {
    resource: "dataElementGroups",
    params: {
      paging: false,
      filter: "name:eq:A_OpenLMIS ADEx",
      fields: ["id,name,dataElements(id,name,code,displayShortName)"],
    },
  },
  organisationUnits: {
    resource: "organisationUnits",
    params: {
      paging: false,
      filter: "name:eq:MOH MALAWI Govt",
      fields: ["id,name,level,path,displayName,code"],
    },
  },
  organisationUnitGroups: {
    resource: "organisationUnitGroups",
    params: {
      paging: false,
      filter: "code:eq:GlobalFundOpenLMISADEx",
      fields: ["id,name,code,organisationUnits(id,name,code)"],
    },
  },
};

function InitiateTransaction(props) {
  const navigate = useNavigate();
  const engine = useDataEngine();
  const endpoint = "http://3.139.98.58:7000/";
  const [dataElementGroup, setElementGroupe] = useState([]);
  const [orgUnit, setOU] = useState([]);
  const [orgUnits, setOrgUnits] = useState([]);
  const [payload, setPayload] = useState();
  const [loading, setLoading] = useState(true);
  const [hide, setHidden] = useState(true);
  const [message, setMessage] = useState(
    "No data Elements found in  data element group"
  );
  const [error, setError] = useState(true);
  const [nameError, setNameError] = useState(false);
  const [descError, setDescError] = useState(false);
  const [transName, setName] = useState();
  const [transDesc, setDesc] = useState();
  const [analytics, setAnalytics] = useState();
  const [periods, setPeriod] = useState(["THIS_MONTH"]);
  const [open, setOpen] = useState(false);
  const [token, setToken] = useState();
  const [disabled, setDisabled] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    await engine
      .query(myQuery)
      .then((res) => {
        setElementGroupe(res?.dataElementGroups?.dataElementGroups[0]);
        setOU(res?.organisationUnits?.organisationUnits[0]);
        setOrgUnits(res?.organisationUnitGroups?.organisationUnitGroups[0]);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setHidden(false);
        setMessage(error);
      });
  };

  const fetchAnalytics = async () => {
    const dataElements = dataElementGroup.dataElements;
    const organisationUnits = orgUnits?.organisationUnits;
    const groupID = orgUnits.id;
    if (dataElements?.length > 0 && organisationUnits?.length > 0) {
      setLoading(true);
      let dataElementID = [];
      let orgUnitsIdList = [];

      dataElements.map((dataElement) => dataElementID.push(dataElement.id));
      GetAnalytics.analytics(engine, dataElementID, periods, groupID)
        .then((res) => {
          setAnalytics(res.analytics);
          setLoading(false);
        })
        .catch(() => {
          setHidden(false);
          setLoading(false);
        });
    } else {
      setHidden(false);
      setLoading(false);
    }
  };

  //pushing the to dataStore
  const pushToDataStore = async (trigger) => {
    let state =
      trigger === "draft"
        ? "draft"
        : trigger === "success"
        ? "success"
        : "failed";
    const Object = {
      id: `OPEN-${Date.now()}`,
      user_id: props?.data?.me,
      analytics: analytics,
      name: transName,
      date: new Date().toDateString(),
      description: transDesc,
      status: state,
      approved: false,
    };
    const myMutation = {
      resource: `dataStore/OpenLMIS_SnowFlake_Intergration/${Date.now()}`,
      type: "create",
      data: Object,
    };
    await engine
      .mutate(myMutation)
      .then((res) => {
        if (res.httpStatusCode == 200 || res.httpStatusCode == 201) {
          setError(false);
          setMessage("Transaction successifuly saved to Datastore");
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

  const transformation = (description) => {
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
      description: description,
      reportingUnit: "MWI",
      facilities: facilities,
    };
  };

  //this function sends data to Mediator application
  const pushToIL = async () => {
    const py = transformation(transDesc);
    const headers = {
      "Access-Control-Allow-Origin": "*",
    };
    await axios
      .post(
        endpoint,
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
  };

  const submit = async (trigger) => {
    setLoading(true);
    if (transName === undefined || transName.length === 0) {
      setLoading(false);
      setNameError(true);
      setMessage("Transaction name is required");
      setHidden(false);
    } else if (transDesc === undefined || transDesc.length === 0) {
      setLoading(false);
      setDescError(true);
      setMessage("Transaction Description is required");
      setHidden(false);
    } else {
      if (trigger === "draft") {
        console.log(trigger);
        pushToDataStore(trigger);
      } else {
        //pushing data to Snowflake
        pushToIL();
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchAnalytics();
    console.log(orgUnits);
  }, [periods, dataElementGroup, orgUnit, orgUnits]);

  useEffect(() => {
    if (analytics?.rows.length > 0) {
      setMessage("No data values found");
      setHidden(false);
      setDisabled(false);
    }
  }, [analytics]);
  return (
    <div>
      {loading && (
        <Layer translucent>
          <Center>
            <CircularLoader />
          </Center>
        </Layer>
      )}

      {open && (
        <Modal onClose={() => setOpen(false)}>
          <ModalTitle>Token</ModalTitle>
          <ModalContent>
            <Field label="Token">
              <Input name="token" onChange={(e) => setToken(e.value)} />
            </Field>
          </ModalContent>
          <ModalActions>
            <ButtonStrip end>
              <Button onClick={() => setOpen(false)}>Cancel</Button>
              <Button
                primary
                onClick={() => {
                  setOpen(false);
                  submit("success");
                }}
              >
                Submit
              </Button>
            </ButtonStrip>
          </ModalActions>
        </Modal>
      )}
      <div
        style={{
          padding: "20px",
        }}
      >
        <div
          style={{
            padding: 10,
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: "row",

            gap: 40,
          }}
        >
          <Button basic>
            <Link to={"/"} style={{ textDecoration: "none", color: "black" }}>
              Back
            </Link>
          </Button>
          <div style={{ fontSize: 26 }}>
            <span style={{ padding: 10 }}>Initiate Transaction</span>
          </div>
          <div>
            <EditModal periods={periods} setPeriod={setPeriod} />
          </div>
        </div>
        <div
          style={{
            padding: 10,
            marginTop: 20,
          }}
        >
          <div
            style={{
              width: "50%",
            }}
          >
            <Field label="Transaction name">
              <Input
                name="TransID"
                error={nameError}
                onChange={(e) => {
                  setName(e.value);
                  setNameError(false);
                }}
              />
            </Field>
          </div>
          <div
            style={{
              width: "50%",
              marginTop: 10,
            }}
          >
            <Field label="Transaction Description">
              <TextArea
                name="TransDesc"
                error={descError}
                onChange={(e) => {
                  setDesc(e.value);
                  setDescError(false);
                }}
              />
            </Field>
          </div>
          <div style={{ marginTop: 10 }}></div>
        </div>
        <div
          style={{
            textAlign: "center",
          }}
        >
          <h3>Data Preview</h3>
        </div>
        {analytics?.rows.length > 0 ? (
          <div
            style={{
              maxWidth: "100%",
              overflow: "scroll",
            }}
          >
            <Preview
              analytics={analytics}
              styles={props?.styles}
              setPayload={setPayload}
              key={analytics}
            />
          </div>
        ) : (
          <Noticebox
            title={"No datavalues found"}
            message={
              "No datavalues found please change the selected periods and try again"
            }
          />
        )}
        <div
          style={{
            padding: "80px",
          }}
        >
          <ButtonStrip end>
            <Button
              secondary
              disabled={disabled}
              onClick={() => submit("draft")}
            >
              Save as Draft
            </Button>
            <Button primary disabled={disabled} onClick={() => setOpen(true)}>
              Submit
            </Button>
          </ButtonStrip>
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
    </div>
  );
}

export default InitiateTransaction;
