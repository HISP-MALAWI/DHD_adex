import React, { useState, useEffect, useContext } from "react";
import {
  Divider,
  Table,
  TableBody,
  DataTableCell,
  DataTable,
  DataTableRow,
  DataTableColumnHeader,
  TableFoot,
  TableHead,
  TableRow,
  TableRowHead,
} from "@dhis2/ui";
import _, { values } from "lodash";
import TransactionContext from "../context/contexts/TransactionContext";

// import OrganisationUnitGroups from "../Services/data/store/orgUnitsGroup";

export default function Preview(props) {
  const { transactionById } = useContext(TransactionContext);
  const [analytics, setAnalytics] = useState([]);
  const [vs, setVs] = useState([]);
  const [dx, setDE] = useState([]);

  const prepareAnalytics = (analytics) => {
    const rows = analytics?.rows;
    const periods = Object.values(analytics?.metaData?.items).filter(
      (pe) => pe?.dimensionItemType === "PERIOD"
    );
    const dataElements = Object.values(analytics?.metaData?.items).filter(
      (pe) => pe?.dimensionItemType === "DATA_ELEMENT"
    );
    const orgUnitss = Object.values(analytics?.metaData?.items).filter(
      (pe) => pe?.dimensionItemType === "ORGANISATION_UNIT"
    );
    const periodsDataValues = _.groupBy(rows, function (row) {
      return row[2];
    });
    const groupByOU = _.groupBy(rows, function (row) {
      return row[1];
    });
    let DXValues = [];
    //grouping data elements by code prefix
    const de = _.groupBy(dataElements, function (de) {
      const code = de.code.split("-");
      return code[0];
    });
    const stockOnHand = [];
    Object.values(de).map((x) => {
      x.map((de) => {
        let name = de.name;
        if (name.includes("Stock on hand")) {
          const name_ = name.split("Stock on hand")[0];
          stockOnHand.push(name_);
        }
      });
    });
    setDE(stockOnHand);
    //organising analaytics
    const ouValues = Object.values(groupByOU);
    ouValues?.map((ou) => {
      const org = orgUnitss.filter((e) => e.uid === ou[0][1])[0];
      let ouvalue = [];
      const groupsByPE = _.groupBy(ou, function (ou) {
        return ou[2];
      });
      let peCompilitation = [];

      Object.values(groupsByPE).map((e) => {
        let dxPE = [];
        let pe = null;
        e.map((row) => {
          let dataElement = dataElements.filter((e) => e.uid === row[0])[0];
          pe = periods.filter((pe) => pe.uid === row[2])[0];
          dxPE.push({
            productCode: dataElement?.code,
            reportingPeriod: row[2],
            productDescription: dataElement?.name,
            value: row[3],
          });
        });
        peCompilitation.push({ period: pe?.name, values: dxPE });
      });

      ouvalue.push(peCompilitation);
      DXValues.push({
        facilityCode: org.uid,
        facilityName: org.name,
        values: peCompilitation,
      });
    });
    setAnalytics(DXValues);
    props?.setPayload(DXValues);
  };

  useEffect(() => {
    // console.log(transactionById);
    prepareAnalytics(props?.analytics);
  }, []);

  return (
    <div className="" style={{ overflowX: "auto" }}>
      <DataTable>
        {analytics?.map((val, index) => {
          return (
            <div>
              <div
                style={{
                  backgroundColor: "#0d47a1",
                  height: "10px",
                  width: "100%",
                  margin: "auto",
                  opacity: "0.8",
                }}
              />
              <TableHead>
                <DataTableColumnHeader>Organisation Unit</DataTableColumnHeader>
                <DataTableColumnHeader colSpan="9">
                  {val.facilityName}
                </DataTableColumnHeader>
              </TableHead>
              <TableHead>
                <DataTableColumnHeader>Periods</DataTableColumnHeader>
                {val.values.map((pe, index) => {
                  return (
                    <>
                      <DataTableColumnHeader colSpan="6">
                        {pe.period}
                      </DataTableColumnHeader>
                    </>
                  );
                })}
              </TableHead>
              <TableHead>
                {val.values.map((pe, index) => {
                  return (
                    <>
                      {index === 0 && (
                        <DataTableColumnHeader>
                          <span style={{ fontSize: "12px" }}>Data Element</span>
                        </DataTableColumnHeader>
                      )}
                      <DataTableColumnHeader>
                        <span style={{ fontSize: "12px" }}>
                          Closing Balance (Stock on Hand)
                        </span>
                      </DataTableColumnHeader>
                      <DataTableColumnHeader>
                        <span style={{ fontSize: "12px" }}>
                          Quantity Used in Period
                        </span>
                      </DataTableColumnHeader>
                      <DataTableColumnHeader>
                        <span style={{ fontSize: "12px" }}>
                          Months of Stock
                        </span>
                      </DataTableColumnHeader>
                      <DataTableColumnHeader>
                        <span style={{ fontSize: "12px" }}>Stock Out Days</span>
                      </DataTableColumnHeader>
                      <DataTableColumnHeader>
                        <span style={{ fontSize: "12px" }}>
                          Average Stock out Days
                        </span>
                      </DataTableColumnHeader>
                      <DataTableColumnHeader>
                        <span style={{ fontSize: "12px" }}>
                          Quantity Received
                        </span>
                      </DataTableColumnHeader>
                    </>
                  );
                })}
              </TableHead>
              <TableBody>
                {dx.map((e) => {
                  return (
                    <DataTableRow>
                      <DataTableCell bordered>
                        <span style={{ fontSize: "12px" }}>{e}</span>
                      </DataTableCell>
                      {val.values.map((vl, index) => {
                        return [
                          "Stock on hand",
                          "Quantity used",
                          "Months of stock",
                          "Stock out days",
                          "Average Monthly consumption",
                          "quantity received",
                        ].map((dataKey) => {
                          return vl.values.filter(
                            (a) =>
                              a.productDescription.includes(e) &&
                              a.productDescription.includes(dataKey)
                          )[0]?.value != null ? (
                            <DataTableCell bordered>
                              <span style={{ fontSize: "12px" }}>
                                {
                                  vl.values.filter(
                                    (a) =>
                                      a.productDescription.includes(e) &&
                                      a.productDescription.includes(dataKey)
                                  )[0]?.value
                                }
                              </span>
                            </DataTableCell>
                          ) : (
                            <DataTableCell bordered></DataTableCell>
                          );
                        });
                        // let a = vl.values.filter(
                        //   (a) =>
                        //     a.productDescription.includes(e) &&
                        //     a.productDescription.includes("Stock on hand")
                        // )[0];
                        // let b = vl.values.filter(
                        //   (a) =>
                        //     a.productDescription.includes(e) &&
                        //     a.productDescription.includes("Quantity used")
                        // )[0];
                        // let c = vl.values.filter(
                        //   (a) =>
                        //     a.productDescription.includes(e) &&
                        //     a.productDescription.includes("Months of stock")
                        // )[0];
                        // let d = vl.values.filter(
                        //   (a) =>
                        //     a.productDescription.includes(e) &&
                        //     a.productDescription.includes("Stock out days")
                        // )[0];
                        // let ea = vl.values.filter(
                        //   (a) =>
                        //     a.productDescription.includes(e) &&
                        //     a.productDescription.includes(
                        //       "Average Monthly consumption"
                        //     )
                        // )[0];
                        // let f = vl.values.filter(
                        //   (a) =>
                        //     a.productDescription.includes(e) &&
                        //     a.productDescription.includes("quantity received")
                        // )[0];

                        // return (
                        //   <DataTableCell bordered>
                        //     <div
                        //       style={{
                        //         display: "flex",
                        //         justifyContent: "space-between",
                        //         alignItems: "center",
                        //       }}
                        //     >
                        //       <div>{a?.value === null ? "-" : a?.value}</div>
                        //       <div>{b?.value === null ? "-" : b?.value}</div>
                        //       <div>{c?.value === null ? "-" : c?.value}</div>
                        //       <div>{d?.value === null ? "-" : d?.value}</div>
                        //       <div>{ea?.value === null ? "-" : ea?.value}</div>
                        //       <div>{f?.value === null ? "-" : f?.value}</div>
                        //     </div>
                        //   </DataTableCell>
                        // );
                      })}
                    </DataTableRow>
                  );
                })}
              </TableBody>
              <Divider />
            </div>
          );
        })}
      </DataTable>
    </div>
  );
}
