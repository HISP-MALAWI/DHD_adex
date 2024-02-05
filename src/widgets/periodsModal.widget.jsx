import {
  Button,
  ButtonStrip,
  Modal,
  ModalActions,
  ModalContent,
  Tab,
  TabBar,
} from "@dhis2/ui";
import React, { useState, useEffect } from "react";
import OrgUnits from "./orgUnits.widget";
import Periods from "./periods.widget";
import { useDataEngine } from "@dhis2/app-runtime";

function PeriodsModal(props) {
  const engine = useDataEngine();
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState(1);
  const [indicators, setIndicators] = useState();
  const [selectedOrgunits, setOrgUnits] = useState([]);
  const [periodType, setPeriodType] = useState("Months");
  const [selectedPeriods, setPeriods] = useState([]);

  const submit = async () => {
    props?.setLoading(true);
    let orgUnits = [];
    selectedOrgunits?.map((select) => {
      let ids = select.split("/");
      orgUnits.push(...select.split("/")?.slice(-1));
    });
    const init = {
      OrgUnit: orgUnits,
      Pe: {
        periods: selectedPeriods,
        periodType: periodType,
      },
      indicator: indicators,
    };
    const myMutation = {
      resource: `dataStore/Mal_Scorecard/Mal_Scorecard`,
      type: "update",
      data: init,
    };
    await engine.mutate(myMutation).then((res) => {
      if (res.httpStatusCode == 200) {
        props?.getScoreCardParams();
      }
    });
    setOpen(false);
  };

  useEffect(() => {
    const intialisation = props?.initalisation?.dataStore;
    setPeriodType(intialisation?.Pe?.periodType);
    setPeriods(intialisation?.Pe?.periods);
    setIndicators(intialisation?.indicator);
    const orgs = [];
    props?.orgUnits?.organisationUnits?.map((org) => {
      if (intialisation?.OrgUnit?.includes(org.id)) {
        orgs.push(org?.path);
      }
    });
    setOrgUnits(orgs);
  }, [props]);
  return (
    <div>
      {open && (
        <Modal large position="middle">
          <ModalContent>
            <TabBar>
              <Tab onClick={() => setTab(1)} selected={tab === 1}>
                Organisation Units
              </Tab>
              <Tab onClick={() => setTab(2)} selected={tab === 2}>
                Periods
              </Tab>
            </TabBar>
            {tab === 1 ? (
              <OrgUnits
                orgUnits={props?.orgUnits}
                selectedOrgunits={selectedOrgunits}
                setOrgUnits={setOrgUnits}
              />
            ) : (
              <Periods
                periodTypes={props?.periodsTypes}
                periodType={periodType}
                setPeriodType={setPeriodType}
                selectedPeriods={selectedPeriods}
                setPeriods={setPeriods}
              />
            )}
          </ModalContent>
          <ModalActions>
            <ButtonStrip end>
              <Button primary onClick={() => submit()}>
                Update
              </Button>
              <Button destructive onClick={() => setOpen(false)}>
                Cancel
              </Button>
            </ButtonStrip>
          </ModalActions>
        </Modal>
      )}
      <Button primary onClick={() => setOpen(true)}>
        Period
      </Button>
    </div>
  );
}

export default PeriodsModal;
