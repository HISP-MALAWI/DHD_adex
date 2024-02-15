import { Field, Transfer } from '@dhis2/ui';
import React,{useEffect,useState} from 'react';
import LeftHeader from './leftHeader.widget';
import PeriodsOptions from '../Services/getPeriod'

const periodOptions = new PeriodsOptions()
const periodTypes = ["Months","Bi-months",'Quarters','Six-months','Years']
function Periods(props) {
    const[year,setYear] = useState(new Date().getFullYear())
    const [relative,setRelative] = useState(true)
    
    const [Options, setOptions] = useState([...periodOptions.relativePeriod(),...periodOptions.fixedPeriod(year)])

    const changeYear = (yr)=>{
        let pe = Options;
        setYear(yr)
        pe.push(...periodOptions.fixedPeriod(yr))
        setOptions(pe)
    }
    const filterCallback = (options,filter)=>{
        if(relative){
            const opt = options.filter(
              (object)=> object?.dimension === 'relative' && object.type === props?.periodType)
              return opt
              
        }else{
          const opt = options.filter(
            (object)=> object.dimension === undefined && object.type === props?.periodType
          )
          if(props?.periodType === 'Years'){
            return opt
          }else{
            return _.uniqBy(opt.filter((object) => object.label.includes(year)),a=>a.value)
          }
          }
    }
    return (
        <div>
                <div style={{
                    padding: '10px',
                    width : '100%'
                }}>
             <Transfer
             height='400px'
            leftHeader={<LeftHeader 
                            selperiodType={props?.periodType} 
                            setPeriodType={props?.setPeriodType} 
                            year={year} 
                            setYear={changeYear } 
                            setRelative={setRelative} 
                            periodType={periodTypes} />}
            options={_.uniqBy(Options,a=> a.value )}
            filterable
            hideFilterInput
            onFilterChange={(e)=> console.log(e)}
            filterCallback={filterCallback}
            onChange={(selected)=>{
                props?.setPeriods(selected.selected)
            }}
            selected={props?.selectedPeriods}
            selectedEmptyComponent={
                <p style={{ textAlign: "center", fontSize: "14px", color: "gray" }}>
                  You have not selected anything yet...
                  <br />
                </p>
              }
            />
            </div>
        </div>
    );
}

export default Periods;