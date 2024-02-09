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
import DataElementGroups from "../Services/data/store/dataElementGroups";

export default function Preview() {
  const engine = useDataEngine();
  const [analytics, setAnalytics] = useState([]);
  useEffect(() => {
    DataElementGroups.dataElementGroups(engine).then((res) => {
      console.log(res);
    });
    // GetAnalytics.analytics(
    //   engine,
    //   [
    //     "FX640XO5V1C",
    //     "KYVN98396QE",
    //     "17H768X27B",
    //     "0YY71FP4061",
    //     "6OB7IWP255Y",
    //     "5252T5C35SI",
    //     "A4YEI2Q2PE8",
    //     "T8XJ6AQ1WB4",
    //     "79J4V0T3JZ2",
    //     "R1J184BQHN2",
    //     "CD2RNQCX1B1",
    //     "U15D2KT93SU",
    //   ],
    //   "202204",
    //   "lZsCb6y0KDX"
    // ).then((res) => {
    //   console.log(res);
    // });
  }, [analytics]);

  return (
    <div>
      <Table>
        <TableHead>
          <TableRowHead>
            <TableCellHead>Indicator Name</TableCellHead>
            <TableCellHead>Closing Balance (Stock on Hand)</TableCellHead>
            <TableCellHead>Losses</TableCellHead>
            <TableCellHead>(+ve) Adjustment</TableCellHead>
            <TableCellHead>(-ve) Adjustment</TableCellHead>
            <TableCellHead>Quantity Used in Period</TableCellHead>
            <TableCellHead>Stocked Out Days</TableCellHead>
            <TableCellHead>Quantity Received</TableCellHead>
          </TableRowHead>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>Acyclovir 200mg, tablets</TableCell>
            <TableCell>{Math.floor(Math.random() * (10000 - 100))}</TableCell>
            <TableCell>{Math.floor(Math.random() * (10000 - 100))}</TableCell>
            <TableCell>{Math.floor(Math.random() * (10000 - 100))}</TableCell>
            <TableCell>{Math.floor(Math.random() * (10000 - 100))}</TableCell>
            <TableCell>{Math.floor(Math.random() * (10000 - 100))}</TableCell>
            <TableCell>{Math.floor(Math.random() * (10000 - 100))}</TableCell>
            <TableCell>{Math.floor(Math.random() * (10000 - 100))}</TableCell>
          </TableRow>
        </TableBody>
        <TableFoot>
          <TableRow></TableRow>
        </TableFoot>
      </Table>
    </div>
  );
}
