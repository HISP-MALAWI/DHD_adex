import { NoticeBox } from '@dhis2/ui';
import React from 'react';

function Noticebox() {
    return (
        <div>
            <NoticeBox title="No transactions ">
                No transaction saved at moment. Please click the initalise transaction button at the top corner 
            </NoticeBox>
        </div>
    );
}

export default Noticebox;