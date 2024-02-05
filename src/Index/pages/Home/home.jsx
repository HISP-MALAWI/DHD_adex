import React,{useEffect} from 'react';
import Noticebox from '../../../widgets/noticeBox.widget';

function Home(props) {
    useEffect(()=>{
        console.log(props)
    },[])
    return (
        <div style={{
            padding : '20px'
        }}>
            {props?.initialisation === undefined ?
                <Noticebox /> : <></>
            }
        </div>
    );
}

export default Home;