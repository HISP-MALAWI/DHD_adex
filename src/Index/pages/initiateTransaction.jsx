import { Button, ButtonStrip, Field, Input, TextArea } from '@dhis2/ui';
import React,{useState} from 'react';
import EditModal from '../../widgets/editModal.widget';

function InitiateTransaction(props) {
    const [transName,setName] = useState()
    const [transDesc, setDesc] = useState()
    return (
        <div style={{
            padding : '20px'
        }}>
            <ButtonStrip end>
                <EditModal />
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
                    <Input name='TransID' onChange={(e) => setName(e.value)} />
                </Field>
                </div>
                <div style={{
                    padding : '10px',
                    width : '50%'
                }}>
                <Field
                label='Transaction Description'>
                    <TextArea name='TransDesc' onChange={(e) => setDesc(e.value)} />
                </Field>
                </div>
            </div>
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
        </div>
    );
}

export default InitiateTransaction;