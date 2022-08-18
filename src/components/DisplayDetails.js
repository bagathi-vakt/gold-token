import React, { useEffect, useState } from "react";

function DisplayDetails({ contract }) {
  const [goldDetails, setGoldDetails] = useState({});

  const [users, setUsers] = useState([]);
  const initEvents = () => {
    contract.on("BalanceUpdate", (address, amount) => {
      // console.log(`address ${address} amt ${amount}`);
      address = address.toString();
      amount /= 100;
      setGoldDetails((prevState) => {
        prevState[address] = amount;
        return prevState;
      });
    });
  };
  useEffect(() => {
    const interval = setInterval(() => {
      setUsers(Object.keys(goldDetails));
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (contract == null) return;
    initEvents();
  }, [contract]);

  return (
    <div>
      <h3>Gold Holding Details</h3>
      {users.map((address, index) => {
        return (
          <div key={index}>
            {address} : {goldDetails[address]}
          </div>
        );
      })}
    </div>
  );
}

export default DisplayDetails;
