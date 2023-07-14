import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { handleTestData } from "../services/testService";

const Test = () => {
  const dummyData = useSelector((state) => state.socket.dummy);

  useEffect(() => {
    handleTestData(dummyData);
  }, [dummyData]);

  return (
    <div>
      <h5>Notification: {dummyData}</h5>
    </div>
  );
};

export default Test;

// import { useSelector } from 'react-redux';
// import React, { useEffect } from 'react';

// const Test = () => {
//     const dummyData = useSelector((state) => state.socket.dummy);
//     useEffect(() => {
//         console.log(dummyData, "test data");
//     }, [dummyData]);
//     return (
//         <div>
//             <h5>notification: {dummyData}</h5>
//         </div>
//     )
// }
// export default Test;
