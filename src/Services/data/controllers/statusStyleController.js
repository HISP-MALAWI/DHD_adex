let StatusStyleController = {
  backGroundColor: (status) => {
    let statusMessage = status?.toLowerCase();
    if (statusMessage == "success") {
      return "green";
    } else if (statusMessage == "failed") {
      return "red";
    } else if (statusMessage == "draft") {
      return "blue";
    } else {
      return "blue";
    }
  },
};
export default StatusStyleController;
