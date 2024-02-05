import { Button, ButtonStrip, Modal, ModalActions, ModalContent, ModalTitle, Tab, TabBar } from '@dhis2/ui';
import React,{useState, useEffect} from 'react';
import OrgUnits from './orgUnits.widget';
import Periods from './periods.widget';
import { useDataEngine } from '@dhis2/app-runtime';


function EditModal(props) {
    const engine = useDataEngine()
    const [open, setOpen] = useState(false)
    const [periodType, setPeriodType] = useState("Months");
    const [selectedPeriods, setPeriods] = useState([])
    
    const submit = async() => {
        setOpen(false)
    }

    return (
        <div >
        {open && <Modal large  position='middle'>
            <ModalTitle>Periods</ModalTitle>
        <ModalContent>            
            <Periods 
                periodTypes={props?.periodsTypes} 
                periodType = {periodType}
                setPeriodType = {setPeriodType}
                selectedPeriods={selectedPeriods} 
                setPeriods={setPeriods}/>

        </ModalContent>
        <ModalActions>
            <ButtonStrip end>
                <Button primary onClick={()=> submit()}>
                    Update
                </Button>
                <Button destructive onClick={()=> setOpen(false)}>
                    Cancel
                </Button>
            </ButtonStrip>
        </ModalActions>
        </Modal>}
        <div style={{
            display : 'flex'

        }}>
        <div style={{
            marginRight: '10px'
        }}>
        <Button toggled onClick={()=>{
            setOpen(true)
        }}>
            Set Periods
        </Button>
        </div>
        </div>
        </div>
        
    );
}

export default EditModal;