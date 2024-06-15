const TransactionsController = {
  getTransactions: async (engine) => {
    const myQuery = {
      dataStore: {
        resource: "dataStore/OpenLMIS_SnowFlake_Intergration",
        params: {
          paging: false,
          fields: ["."],
        },
      },
    };
    try {
      const res = await engine.query(myQuery);
      if (res.dataStore == undefined || res.dataStore == null) {
        return { error: true, message: "No such key in the dataStore" };
      } else {
        if (res?.dataStore?.length == 0) {
          return { error: true, message: "No data in the dataStore" };
        } else {
          return { error: false, message: "Success", data: res?.dataStore };
        }
      }
    } catch (e) {
      return { error: true, message: "No such key in the dataStore" };
    }
  },
  getIPAddress: async (engine) => {
    const myQuery = {
      dataStore: {
        resource: "dataStore/OpenLMIS_SnowFlake_Intergration_Protocol/protocol",
        params: {
          paging: false,
          fields: ["."],
        },
      },
    };
    try {
      const res = await engine.query(myQuery);
      if (res.dataStore == undefined || res.dataStore == null) {
        return { error: true, message: "No such key in the dataStore" };
      } else {
        if (res?.dataStore?.length == 0) {
          return { error: true, message: "No data in the dataStore" };
        } else {
          return { error: false, message: "Success", data: res?.dataStore };
        }
      }
    } catch (e) {
      return { error: true, message: "No such key in the dataStore" };
    }
  },
  getTransactionById: async (engine, location) => {
    const queryParams = new URLSearchParams(location.search);
    const id = JSON.parse(queryParams.get("id"));
    // console.log(id);
    if (id != undefined || id != null || id != "") {
      const myQuery = {
        dataStore: {
          resource: `dataStore/OpenLMIS_SnowFlake_Intergration/${id}`,
          params: {
            paging: false,
            fields: ["."],
          },
        },
      };
      try {
        const res = await engine.query(myQuery);
        // console.log(res);
        if (
          res?.dataStore == undefined ||
          res?.dataStore == null ||
          res?.dataStore == ""
        ) {
          return { error: true, message: "No such key in the dataStore" };
        } else {
          if (Object.keys(res?.dataStore)?.length == 0) {
            return { error: true, message: "No data in the dataStore" };
          } else {
            return { error: false, message: "Success", data: res?.dataStore };
          }
        }
      } catch (e) {
        return { error: true, message: "No such key in the dataStore" };
      }
    } else {
      return { error: true, message: "Error: Server error" };
    }
  },
};
export default TransactionsController;
