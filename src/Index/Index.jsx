import { ButtonStrip, Center, CircularLoader, Layer } from '@dhis2/ui';
import React,{useEffect,useState} from 'react';
import Header from '../widgets/header.widget';
import InitiateTransaction from './pages/initiateTransaction';
import { useDataEngine } from '@dhis2/app-runtime';
import Home from './pages/Home/home';

function Index(props) {
    const engine = useDataEngine()
    const [loading, setLoading] = useState(true)
    const [page,setPage] = useState('index')
    const [initialisations, setInitalisations] = useState()

    const fetchTransactions = async() => {
        const dataStoreKeys = props?.data?.dataStore
        if(dataStoreKeys.includes('GF_transactions')){
            const query = { dataStore: {
                resource: "dataStore/GF_transactions",
                params: {
                  paging: false,
                  fields: ["*"],
                },
              },
            }
            const res = await engine.query(query);

        }
        setLoading(false)
    }
    useEffect(()=>{
        console.log(props)
        fetchTransactions()
    },[])
    return (
        <div>

        <Header page={page} setPage={setPage} styles={props?.styles}/>
       {loading ? <Layer translucent>
        <Center>
            <CircularLoader />
        </Center>
       </Layer>: 
        <>{page === 'index' ?
            <Home initialisations={initialisations} styles={props?.styles} data={props?.data} />
            :
            <>
            {page === 'init' ? 
            <InitiateTransaction data={props?.data} styles={props?.styles} /> : <>
                <Center>
                    View Transaction
                </Center>
            </>}
            </>

        }</>}    
        </div>
    );
}

export default Index;