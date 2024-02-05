import { ButtonStrip, Center } from '@dhis2/ui';
import React,{useEffect,useState} from 'react';
import Header from '../widgets/header.widget';
import InitiateTransaction from './pages/initiateTransaction';

function Index(props) {
    const [page,setPage] = useState('index')
    useEffect(()=>{
        console.log(props)
    },[])
    return (
        <div>
        <Header page={page} setPage={setPage} styles={props?.styles}/>
        {page === 'index' ?
            <>
            <Center>
                Home
            </Center>
            </>
            :
            <>
            {page === 'init' ? 
            <InitiateTransaction /> : <>
                <Center>
                    View Transaction
                </Center>
            </>}
            </>

        }    
        </div>
    );
}

export default Index;