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

export default function Preview(props) {

  useEffect(()=>{
    console.log(props)
  },[])
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
