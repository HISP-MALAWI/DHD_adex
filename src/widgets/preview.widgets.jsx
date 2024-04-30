import React, { useState, useEffect } from "react";
import {
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
import GetAnalytics from "../Services/data/store/analytics";
import { useDataEngine } from "@dhis2/app-runtime";
import _, { values } from "lodash";
import DataElementGroups from "../Services/data/store/dataElementGroups";
import Noticebox from "./noticeBox.widget";

// import OrganisationUnitGroups from "../Services/data/store/orgUnitsGroup";

export default function Preview(props) {
  const [analytics, setAnalytics] = useState([]);
  const [vs, setVs] = useState([]);
  const [dx,setDE] = useState([])

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
    let DXValues = []
    //grouping data elements by code prefix
    const de = _.groupBy(dataElements,function(de){
      const code = de.code.split("-")
      return code[0]
    })
    const stockOnHand = []
    Object.values(de).map((x)=>{
      x.map(de => {
        let name = de.name
        if(name.includes('Stock on hand')){
          const name_ = name.split('Stock on hand')[0]
          stockOnHand.push(name_)
        }
      })
    })
    setDE(stockOnHand)
    //organising analaytics 
    const ouValues = Object.values(groupByOU);
    ouValues?.map((ou)=>{
      const org = orgUnitss.filter(e => e.uid === ou[0][1])[0]
      let ouvalue = []
     const groupsByPE = _.groupBy(ou,function(ou){
      return ou[2]
     })
     let peCompilitation = []

     Object.values(groupsByPE).map(e => {
       let dxPE = []
       let pe = null
      e.map(row =>{
        let dataElement = dataElements.filter(e => e.uid === row[0])[0]
        pe = periods.filter(pe => pe.uid === row[2])[0];
        dxPE.push({productCode : dataElement?.code,
                  reportingPeriod: row[2],
                productDescription: dataElement?.name,
              values : row[3]})
      })      
      peCompilitation.push({period : pe?.name,values :dxPE})
     })

     ouvalue.push(peCompilitation)
     DXValues.push({facilityCode : org.code,facilityName:org.name, values:peCompilitation})
    })
    setAnalytics(DXValues);
  };


  useEffect(() => {
    prepareAnalytics(props?.analytics);
  }, [props]);

  return (
    
      <DataTable>
        {analytics?.map((val,index)=>{
          return(
            <>
            <TableHead>
              <DataTableColumnHeader  colSpan="9">{val.facilityName}</DataTableColumnHeader>              
            </TableHead>
            <TableHead>
              <DataTableColumnHeader></DataTableColumnHeader>              
              {val.values.map((pe,index)=>{
                return(<>                
                  <DataTableColumnHeader >{pe.period}</DataTableColumnHeader>                  
                  </>
                )
              }                
              )}
            </TableHead>
            <TableHead>
              {val.values.map((pe,index)=>{
                return (<>
                {index === 0 && <DataTableColumnHeader>
                  Data Element
                  </DataTableColumnHeader>}
                <DataTableColumnHeader>{<div style={{
                  display:'flex',
                  justifyContent : 'space-between',
                  alignContent:'center'
                }}>
                  <div key={"Closing Balance"}>
                      Closing Balance (Stock on Hand)
                    </div>
                    <div key={"qty"}>
                      Quantity Used in Period
                    </div>
                    <div>
                      Months of Stock
                    </div>
                    <div key={"stk"}>Stock Out Days</div>
                    <div>
                      Average Stock out Days
                    </div>
                    <div  key={"rc"}>
                      Quantity Received
                    </div>
                </div>
                  }</DataTableColumnHeader>
                
                </>)
              })}
            </TableHead>
            <TableBody>
              {dx.map(e => {
                return(
                  <DataTableRow>
                    <DataTableCell>
                      {e}
                    </DataTableCell>
                    {val.values.map((vl,index)=>{
                      let a = vl.values.filter(a => a.productDescription.includes(e) && a.productDescription.includes('Stock on hand'))[0]
                      let b = vl.values.filter(a => a.productDescription.includes(e) && a.productDescription.includes('Quantity used'))[0]
                      let c = vl.values.filter(a => a.productDescription.includes(e) && a.productDescription.includes('Months of stock'))[0]
                      let d = vl.values.filter(a => a.productDescription.includes(e) && a.productDescription.includes('Stock out days'))[0]
                      let ea = vl.values.filter(a => a.productDescription.includes(e) && a.productDescription.includes('Average Monthly consumption'))[0]
                      let f = vl.values.filter(a => a.productDescription.includes(e) && a.productDescription.includes('quantity received'))[0]
                      
                      return(
                        <DataTableCell bordered>
                          <div style={{
                            display:'flex',
                            justifyContent: 'space-between',
                            alignItems : 'center'
                          }}>
                          <div>
                            {a?.values === null? '-' : a?.values}
                          </div>
                          <div>
                            {b?.values=== null? '-' : b?.values}
                          </div>
                          <div>
                            {c?.values === null? '-' : c?.values}
                          </div>
                          <div>
                            {d?.values === null? '-' : d?.values}
                          </div>
                          <div>
                            {ea?.values === null? '-' : ea?.values}
                          </div>
                          <div >
                            {f?.values === null? '-' : f?.values}
                          </div>
                          </div>
                        </DataTableCell>
                      )
                    })}
                  </DataTableRow>
                )
              })}
            </TableBody>
            </>
          )
        })

        }
      </DataTable>
      
  );
}
