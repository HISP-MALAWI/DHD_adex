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
        <Noticebox />
      ) : (
        <>
          <Transactions />
        </>
      )}
    </div>
  );
}

export default Home;
