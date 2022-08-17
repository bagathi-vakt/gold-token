import React, { useEffect, useState } from "react";

function DisplayDetails({ setBalance, contract }) {
  const [goldDetails, setGoldDetails] = useState({});
  const [users, setUsers] = useState([]);

  const initEvents = () => {
    if (contract == null) return;
    contract.on("Transfer", (from, to, amount) => {
      setGoldDetails((prevState) => {
        if (typeof goldDetails[to] === "undefined") {
          prevState[to] = amount / 100;
          setUsers((prevState) => [...prevState, to]);
        } else {
          prevState[to] += amount / 100;
        }

        if (typeof goldDetails[from] === "undefined") {
          prevState[from] = -amount / 100;
        } else {
          prevState[from] -= amount / 100;
        }
        return prevState;
      });
    });
  };
  useEffect(() => {
    initEvents();
  }, [contract]);

  return (
    <div>
      <h3>Gold Holding Details</h3>
      {users.map((address) => {
        return (
          <div key={address}>
            {address} : {goldDetails[address]}
          </div>
        );
      })}
    </div>
  );
}

export default DisplayDetails;
