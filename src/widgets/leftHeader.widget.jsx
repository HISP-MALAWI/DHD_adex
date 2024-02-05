import { Box, Field, Input, SingleSelect, SingleSelectOption, Tab, TabBar } from "@dhis2/ui";
import React, { useEffect,useState } from "react";

export default function LeftHeader(props){
    const tabs = [
        {id:1, name : 'Relative Periods'},
        {id:2, name : 'Fixed Periods'}
    ]

    const [tab,setTab] = useState(1)
    const [selectedPeriod, setPeriod] = useState()
    return (
        <div style={{
            margin : '10px'
        }}>
        <Box>
        <div>
        <TabBar>
            {tabs?.map((tabIndex,key)=>{
                return (
                    <Tab
                  className="tabs"
                  key={key}
                  onClick={() => {
                    setTab(tabIndex.id)
                    if(tabIndex.id === 2){
                        props?.setRelative(false)
                    }else{
                        props?.setRelative(true)
                    }                    
                  }}
                  selected={tab === tabIndex?.id}
                >
                  {tabIndex?.name}
                </Tab>
                )
            })}
        </TabBar>
        {tab === 1 ? 
        <div style={{
            marginTop : '10px'
        }} >
        <Field label="Period Types">
            <SingleSelect
            className='select'
            onChange ={(e)=>{
                props?.setPeriodType(e.selected)
            }}
            placeholder= 'Select period'
            selected={props?.selperiodType}
            >
                {props?.periodType?.map((periodTyp, index) => {
                return (
                  <SingleSelectOption
                    key={index}
                    label={periodTyp}
                    value={periodTyp}
                  />
                );
              })}

            </SingleSelect>
        </Field>
        </div> : <div style={{
            display : 'flex',
            justifyContent: 'space-between'
        }} >
        <div style={{
            marginRight: '5px'
        }}>
        <Field label="Period Types">
            <SingleSelect
            className='select'
            onChange ={(e)=>{
            
                props?.setPeriodType(e.selected)
            }}
            placeholder= 'period'
            selected={props?.selperiodType}
            >
                {props?.periodType?.map((periodTyp, index) => {
                return (
                  <SingleSelectOption
                    key={index}
                    label={periodTyp}
                    value={periodTyp}
                  />
                );
              })}

            </SingleSelect>
        </Field>
        </div>
        <Field label="Year">
        <Input
                name="year"
                type="number"
                value={props?.year}
                onChange={(e) => {
                    props?.setYear(e.value)  
                }}
              />
        </Field>
        </div>}
        </div>
        </Box>
        </div>
    )
}