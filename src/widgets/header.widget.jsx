import { Button } from '@dhis2/ui';
import React,{useEffect} from 'react';

function Header(props) {
    useEffect(()=>{
        console.log(props)
    },[])
    return (
        <div style={{
            padding : '20px',
            background : 'rgb(233, 237, 245)',
            display : 'flex',
            justifyContent : 'space-between'
        }}>
            
            <Button className={props?.page === 'index' && props?.styles?.hide} secondary onClick={()=> props?.setPage('index')}>
                Back
            </Button>
            <div style={{
                margin : '10px',
                fontFamily : 'sans-serif',
                fontWeight : 'bold',
                fontSize : 'larger',
                textDecoration: 'underline',
                
            }}>
                {props?.page === 'index' ? <>DASHBOARD</> : <>{props?.page === 'init' ? <>Initiate Transaction</> : <>Transaction Review</>}</>}
            </div>
            <Button className={props?.page !== 'index' && props?.styles?.hide} primary onClick={()=> props?.setPage('init')}>
                Initiate Transaction
            </Button>
            
        </div>
    );
}

export default Header;