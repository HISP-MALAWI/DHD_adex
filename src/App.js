import React from 'react'
import { DataQuery } from '@dhis2/app-runtime'
import i18n from '@dhis2/d2-i18n'
import classes from './App.module.css'
import { Center, CircularLoader, Layer } from '@dhis2/ui'
import Index from './Index/Index'

const query = {
    me: {
        resource: 'me',
    },
    dataStore: {
        resource: "dataStore",
        params: {
          paging: false,
          fields: ["*"],
        },
      },
}

const MyApp = () => (
    <div>
        <DataQuery query={query}>
            {({ error, loading, data }) => {
                if (error) return <span>{error}</span>
                if (loading) return <Layer translucent>
                    <Center>
                        <CircularLoader />
                    </Center>
                </Layer>
                return (
                    <div>
                       <Index data={data} styles={classes} />
                    </div>
                )
            }}
        </DataQuery>
    </div>
)

export default MyApp
