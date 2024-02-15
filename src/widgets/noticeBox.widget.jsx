import { NoticeBox,AlertBar } from '@dhis2/ui';
import React from 'react';

function Noticebox(props) {
    return (
        <div>
            <NoticeBox title={props?.title}>
                 {props?.message}
            </NoticeBox>
        </div>
    );
}

export default Noticebox;