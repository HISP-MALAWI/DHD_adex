import { AlertBar, Button, ButtonStrip, Center, CircularLoader, Field, Input, Layer, TextArea } from '@dhis2/ui';
import React,{useState, useEffect} from 'react';
import EditModal from '../../widgets/editModal.widget';
import Preview from '../../widgets/preview.widgets';
import { useDataEngine } from '@dhis2/app-runtime';
import GetAnalytics from '../../Services/data/store/analytics';
import Noticebox from '../../widgets/noticeBox.widget';

function    InitiateTransaction(props) {
    const engine = useDataEngine()
    const dataElementGroup = props?.data?.dataElementGroups?.dataElementGroups
    const orgUnit = props?.data?.organisationUnits?.organisationUnits[0]
    const [loading,setLoading] = useState(true)
    const [hidden, setHidden] = useState(true)
    const [message, setMessage] = useState('No data Elements found in  data element group')
    const [error,setError] = useState(true)
    const [nameError,setNameError] = useState(false)
    const [descError,setDescError] = useState(false)
    const [transName,setName] = useState()
    const [transDesc, setDesc] = useState()
    const [analytics, setAnalytics] = useState()
    const [periods, setPeriod] = useState(['THIS_MONTH'])

    const fetchAnalytics = async() => {
        const dataElements = dataElementGroup[0].dataElements
        if(dataElements.length > 0){
            setLoading(true)
            console.log(dataElements)
            let dataElementID = []
            dataElements.map(dataElement => dataElementID.push(dataElement.id))
            GetAnalytics.analytics(engine,dataElementID,periods,orgUnit.id)
                .then(res =>{
                    setAnalytics(res.analytics)
                    setLoading(false)
                } ).catch(()=>{
                    setHidden(false)
                    setLoading(false)        
                })
        }else{
            setHidden(false)
            setLoading(false)
        }
    }

    //pushing the to dataStore
    const pushToDataStore =async(trigger) =>{
        let state = trigger === 'draft' ? 'draft' : trigger === 'success' ? 'success' : 'failed' 
        const Object ={
            id : `OPEN-${Date.now()}`,
            user_id : props?.data?.me.id,
            name: transName,
            description : transDesc,
            status : state
        }
        console.log(Object)
    }

    const submit = async(trigger) =>{
        if(transName === undefined){
            setNameError(true)
            setMessage('Transaction name is required')
            setHidden(false)
        }else if( transDesc === undefined){
            setNameError(true)
            setMessage('Transaction name is required')
            setHidden(false)
        }else{
            pushToDataStore(trigger)
        }
    }

    useEffect(() =>{
        console.log( )
        fetchAnalytics()
    },[periods])
    return (
        <div >
        {loading ? <Layer translucent>
            <Center>
                <CircularLoader />
            </Center>
        </Layer> : 
        <div style={{
            padding : '20px'
        }}>
            
            <ButtonStrip end>
                <EditModal periods={periods} setPeriod = {setPeriod} />
            </ButtonStrip>

            <div
                style={{
                    marginTop : '10px',
                    padding : '20px',
                }}
            >
                <div style={{
                    padding : '10px',
                    width : '50%',
                    
                }}>
                <Field
                label='Transaction name'>
                    <Input name='TransID' error={nameError} onChange={(e) => setName(e.value)} />
                </Field>
                </div>
                <div style={{
                    padding : '10px',
                    width : '50%'
                }}>
                <Field
                label='Transaction Description'>
                    <TextArea name='TransDesc' error={descError} onChange={(e) => setDesc(e.value)} />
                </Field>
                </div>
            </div>
            <div style={{
                padding: '10px',
                textAlign:'center',

            }}>
                <h3>Data Preview</h3>
            </div>
            {analytics?.rows.length > 0 ?
            <div style={{
                maxWidth : '100%',
                overflow : 'scroll'
            }}>
            <Preview analytics={analytics} styles={props?.styles} key={analytics}/>
            </div> :
            <Noticebox title={'No datavalues found'} message={"No datavalues found please change the selected periods and try again"} />
            }
            <div
            style={{
                padding : '80px'
            }}>
                <ButtonStrip end>
                    <Button destructive>
                        Cancel
                    </Button>
                    
                    <Button secondary>
                        Save as Draft
                    </Button>
                    <Button primary>
                        Submit
                    </Button>
                </ButtonStrip>
            </div>
            <div style={{
                position : 'absolute',
                bottom : 0,
                left : '50%',
                left: '40%'
            }}>
                <AlertBar warning={error} success={!error} onHidden={()=> setHidden(true)} duration={2000}>
                    {message}
                </AlertBar>
            </div>

        </div>
        }
        
        </div>        
        
    );
}

export default InitiateTransaction;