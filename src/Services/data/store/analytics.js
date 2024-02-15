const url =
  "https://dhis2-staging.kuunika.org:8087/api/40/analytics?dimension=dx%3AFX640XO5V1C%3BKYVN98396QE%3B317H768X27B%3B0YY71FP4061%3B6OB7IWP255Y%3B5252T5C35SI%3BA4YEI2Q2PE8%3BT8XJ6AQ1WB4%3B79J4V0T3JZ2%3BR1J184BQHN2%3BCD2RNQCX1B1%3BU15D2KT93SU,ou%3AlZsCb6y0KDX,pe%3A202203&displayProperty=NAME&includeNumDen=true&skipMeta=false&skipData=false&includeMetadataDetails=true";
let GetAnalytics = {
  analytics: (engine, dataElements, period, orgUnit) => {
    let joinedDataElements = [];
    dataElements?.map((dataElement) => {
      joinedDataElements.push(dataElement);
    });
    let dataDimension = joinedDataElements?.join(";");
    let joinedPE = period.join(";")
    const analystisQuery = {
      analytics: {
        resource: `analytics?dimension=dx:${dataDimension},ou:${orgUnit},pe:${joinedPE}&displayProperty=NAME&includeNumDen=true&skipMeta=false&skipData=false&includeMetadataDetails=true`,
        params: {},
      },
    };
    return engine.query(analystisQuery).then((res) => {
    return res;
    });
  },
};
export default GetAnalytics;
