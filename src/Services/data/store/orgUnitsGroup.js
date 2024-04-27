let OrganisationUnitGroups = {
  organisationUnitGroups: (engine) => {
    const organisationUnitGroupsQuery = {
      organisationUnitGroups: {
        resource: `organisationUnitGroups`,
        params: {
          fields: ["id", "name", "code", "displayName"],
        },
      },
    };
    let group = engine.query(organisationUnitGroupsQuery);
    return group.then((res) => {
      return res;
    });
  },
};
export default OrganisationUnitGroups;
