import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableCellHead,
  TableFoot,
  TableHead,
  TableRow,
  TableRowHead,
} from "@dhis2/ui";
import GetAnalytics from "../Services/data/store/analytics";
import { useDataEngine } from "@dhis2/app-runtime";
import _, { values } from "lodash";
import DataElementGroups from "../Services/data/store/dataElementGroups";
import Noticebox from "./noticeBox.widget";
// import OrganisationUnitGroups from "../Services/data/store/orgUnitsGroup";

export default function Preview(props) {
  const [analytics, setAnalytics] = useState([]);
  const [vs, setVs] = useState([]);

  const prepareAnalytics = (analytics) => {
    const rows = analytics?.rows;
    const periods = Object.values(analytics?.metaData?.items).filter(
      (pe) => pe?.dimensionItemType === "PERIOD"
    );
    const dataElements = Object.values(analytics?.metaData?.items).filter(
      (pe) => pe?.dimensionItemType === "DATA_ELEMENT"
    );
    const periodsDataValues = _.groupBy(rows, function (row) {
      return row[2];
    });
    var values = [];
    const groups = Object.values(periodsDataValues);
    groups?.map((group) => {
      let pe = null;
      var objects = [];
      group?.map((grp) => {
        pe = periods.filter((pe) => pe.uid === grp[2])[0];
        const dataElement = dataElements.filter((de) => de.uid === grp[0])[0];
        objects?.push({
          indicatorName: dataElement?.name,
          indicatorCode: dataElement?.code,
          dataValues: grp[3],
          period: pe?.name,
          periodValue: pe.code,
        });
      });
      values.push({ period: pe?.name, dataValues: objects });
    });
    setAnalytics(values);
  };
  const handleAnalytics = () => {
    let facilities = [];
    let values = [];
    analytics[0]?.dataValues.forEach((analytic) => {
      return values.push({
        productCode: analytic?.indicatorCode,
        reportingPeriod: analytic?.periodValue,
        productDescription: analytic?.indicatorName,
        value: analytic?.dataValues,
      });
    });
    // analytics[0]?.dataValues
    let payloadDesign = {
      description: "Migration treacable medical logitcal commodities",
      reportingUnit: "MWI",
      facilities: [
        {
          facilityCode: "LL040122",
          values: values,
        },
      ],
    };
  };
  useEffect(() => {
    prepareAnalytics(props?.analytics);
  }, [props]);

  useEffect(() => {
    let x = [];
    analytics.map((an) => x.push(...an.dataValues));
    const grps = _.groupBy(x, function (vs) {
      return vs?.indicatorCode.split("-")[0];
    });
    setVs(Object.values(grps));
  }, [analytics]);
  useEffect(() => {
    handleAnalytics();
  });
  return (
    <div
      style={{
        padding: "5px",
        width: "100%",
        overflow: "scrollS",
      }}
    >
      <Table className={props.styles.tb}>
        <TableHead>
          <TableRowHead>
            {props?.analytics &&
              analytics.map((val, index) => {
                2022;
                return (
                  <TableCellHead
                    className={props.styles.border}
                    colSpan={index == 0 ? "5" : "4"}
                    key={val?.period}
                  >
                    <div
                      style={{
                        textAlign: "center",
                      }}
                    >
                      {val?.period}
                    </div>
                  </TableCellHead>
                );
              })}
          </TableRowHead>
          <TableRowHead>
            <TableCellHead>DataElement Name</TableCellHead>
            {props?.analytics &&
              analytics.map((index) => {
                return (
                  <>
                    <TableCellHead key={"Closing Balance"}>
                      Closing Balance (Stock on Hand)
                    </TableCellHead>
                    <TableCellHead key={"qty"}>
                      Quantity Used in Period
                    </TableCellHead>
                    <TableCellHead key={"stk"}>Stock Out Days</TableCellHead>
                    <TableCellHead className={props.styles.border} key={"rc"}>
                      Quantity Received
                    </TableCellHead>
                  </>
                );
              })}
          </TableRowHead>
        </TableHead>
        <TableBody>
          {vs.map((val) => {
            const pe = _.groupBy(val, function (val) {
              return val.period;
            });
            const v = Object.entries(pe);
            const arr = val[0]?.indicatorName.split(" ").slice(1, -3);
            return (
              <TableRow>
                <TableCell>{arr.join(" ")}</TableCell>
                {v.map((va) => {
                  return (
                    <>
                      <TableCell>
                        {
                          va[1].filter((el) =>
                            el?.indicatorName
                              .toLocaleLowerCase()
                              .includes("Stock on Hand".toLocaleLowerCase())
                          )[0]?.dataValues
                        }
                      </TableCell>
                      <TableCell>
                        {
                          va[1].filter((el) =>
                            el?.indicatorName
                              .toLocaleLowerCase()
                              .includes("Quantity used".toLocaleLowerCase())
                          )[0]?.dataValues
                        }
                      </TableCell>
                      <TableCell>
                        {
                          va[1].filter((el) =>
                            el?.indicatorName
                              .toLocaleLowerCase()
                              .includes("Stock Out Days".toLocaleLowerCase())
                          )[0]?.dataValues
                        }
                      </TableCell>
                      <TableCell className={props.styles.border}>
                        {
                          va[1].filter((el) =>
                            el?.indicatorName
                              .toLocaleLowerCase()
                              .includes("Quantity Received".toLocaleLowerCase())
                          )[0]?.dataValues
                        }
                      </TableCell>
                    </>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
        <TableFoot>
          <TableRow></TableRow>
        </TableFoot>
      </Table>
    </div>
  );
}
