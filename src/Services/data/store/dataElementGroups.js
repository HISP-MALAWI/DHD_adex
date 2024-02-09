let DataElementGroups = {
  dataElementGroups: (engine) => {
    const analystisQuery = {
      dataElementGroups: {
        resource: `dataElementGroups`,
        params: {
          fields: ["id", "name", "code", "displayName"],
        },
      },
    };
    let group = engine.query(analystisQuery);
    return group.then((res) => {
      return res;
    });
  },
};
export default DataElementGroups;
