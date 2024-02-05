import { Button, ButtonStrip } from '@dhis2/ui';
import React from 'react';

function InitiateTransaction(props) {
    return (
        <div style={{
            padding : '20px'
        }}>
            <ButtonStrip end>
                <Button primary>
                    Set Periods
                </Button>
            </ButtonStrip>
            
        </div>
    );
}

export default InitiateTransaction;