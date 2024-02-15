import React, { useEffect } from "react";
import Noticebox from "../../../widgets/noticeBox.widget";
import Transactions from "../../../widgets/transactions.widget";

function Home(props) {
  useEffect(() => {
    console.log(props);
  }, []);
  return (
    <div
      style={{
        padding: "20px",
      }}
    >
      {props?.initialisation != undefined ? (
        <Noticebox message={'No transaction saved at moment. Please click the initalise transaction button at the top corner'} title={"No transaction"}/>
      ) : (
        <>
          <Transactions />
        </>
      )}
    </div>
  );
}

export default Home;
