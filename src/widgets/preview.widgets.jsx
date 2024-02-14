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
import _, { values } from 'lodash'
import DataElementGroups from "../Services/data/store/dataElementGroups";

export default function Preview(props) {
  const [analytics,setAnalytics] = useState([])
  const [vs,setVs] = useState([])
  let peArr = []

  const prepareAnalytics = (analytics) => {
    const rows = analytics?.rows  
    const periods = Object.values(analytics?.metaData?.items).filter(pe => pe?.dimensionItemType === "PERIOD")
    const dataElements = Object.values(analytics?.metaData?.items).filter(pe => pe?.dimensionItemType === "DATA_ELEMENT")
    const periodsDataValues = _.groupBy(rows,function(row){
      return row[2]
    })
    var values = []
    const groups = Object.values(periodsDataValues)
    groups.map(group => {
      let pe = null
      var objects =[]
      group.map(grp => {
        pe = periods.filter(pe => pe.uid === grp[2])[0]
        const dataElement = dataElements.filter(de => de.uid === grp[0])[0]
        objects.push({indicatorName : dataElement?.name,indicatorCode : dataElement?.code,dataValues: grp[3],period : pe?.name})
      })
      values.push({period : pe?.name,dataValues:objects})
    })
    setAnalytics(values)
  }

  useEffect(()=>{
    prepareAnalytics(props?.analytics)    
  },[])

  useEffect(()=>{
    let x = []
    analytics.map(an => x.push(...an.dataValues))
    const grps = _.groupBy(x,function(vs){
      return vs?.indicatorCode.split('-')[0]
    })
    setVs(Object.values(grps))
  },[analytics])
  
  
  return (
    <div style={{
      width : "100%",
      overflow : "scrollS"
    }}>
      <Table>
        <TableHead>
          
          <TableRowHead>
            {analytics.map((val,index) =>{2022
              console.log(index)
              return( 
            <TableCellHead colSpan={index== 0 ? '5': '4'} key={val?.period}>
              <div style={{
                textAlign : 'center'
              }}>{val?.period}</div>
            </TableCellHead>
                )})}
          </TableRowHead>
          <TableRowHead>
          <TableCellHead >Dataelement Name</TableCellHead>
            {analytics.map((index)=>{      
            return(
             <>
            <TableCellHead key={'Closing Balance'}>Closing Balance (Stock on Hand)</TableCellHead>
            <TableCellHead key={'qty'}>Quantity Used in Period</TableCellHead>
            <TableCellHead key={'stk'}>Stock Out Days</TableCellHead>
            <TableCellHead key={'rc'}>Quantity Received</TableCellHead>
            </>
            )} )}
          </TableRowHead>          
        </TableHead>
        <TableBody>
        {vs.map(val =>{
          const pe =_.groupBy(val,function(val){
            return val.period
          })
          const v = Object.entries(pe)
          const arr = val[0]?.indicatorName.split(' ').slice(1,-3)
          return(
          <TableRow>
            <TableCell>{arr.join(' ')}</TableCell>
            {v.map(va =>{
            return(<>            
            <TableCell>{va[1].filter(el => el?.indicatorName.toLocaleLowerCase().includes('Stock on Hand'.toLocaleLowerCase()))[0].dataValues}</TableCell>
            <TableCell>{va[1].filter(el => el?.indicatorName.toLocaleLowerCase().includes('Quantity used'.toLocaleLowerCase()))[0]?.dataValues}</TableCell>
            <TableCell>{va[1].filter(el => el?.indicatorName.toLocaleLowerCase().includes('Stock Out Days'.toLocaleLowerCase()))[0]?.dataValues}</TableCell>
            <TableCell>{va[1].filter(el => el?.indicatorName.toLocaleLowerCase().includes('Quantity Received'.toLocaleLowerCase()))[0]?.dataValues}</TableCell>
            </>
            )})}
          </TableRow>
          )})}
        </TableBody>
        <TableFoot>
          <TableRow></TableRow>
        </TableFoot>
      </Table>
    </div>
  );
}
