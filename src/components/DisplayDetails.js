import React, { useEffect, useState } from "react";
import { ethers } from "ethers";

function DisplayDetails({ contract, users, mintDetails, defaultAccount }) {
  const [goldDetails, setGoldDetails] = useState({});

  // const initEvents = () => {
  //   contract.on("Transfer", async (from, to, amount) => {
  //     var balance_frm = await contract.balanceOf(from);
  //     var balance_to = await contract.balanceOf(to);
  //     balance_frm = balance_frm.toNumber() / 100;
  //     balance_to = balance_to.toNumber() / 100;
  //     const obj = goldDetails;
  //     obj[from] = balance_frm;
  //     obj[to] = balance_to;
  //     setGoldDetails(obj);
  //   });
  // };

  useEffect(() => {
    if (!users || !contract) return;
    const interval = setInterval(() => {
      const obj = {};
      // console.log("address is ", users);
      users.map(async (address) => {
        var amt = await contract.balanceOf(address);
        amt = amt.toNumber() / 100;

        // console.log(`ars ${address} amt ${amt}`);
        obj[address] = amt;
        setGoldDetails({ ...goldDetails, ...obj });
      });
    }, 2000);

    return () => {
      clearInterval(interval);
    };
  }, [users, contract]);

  useEffect(() => {
    if (contract == null) return;
    // initEvents();
  }, [contract]);

  const toggleMint = async (address) => {
    await contract.toggleMint(address);
  };

  return (
    <div>
      <h3>Gold Holding Details</h3>
      {users.map((address, index) => {
        return (
          <div key={index}>
            {address} : {goldDetails[address]} ,{"    "}
            {mintDetails[address] ? "mint" : "cantMint"}
            {address === defaultAccount ? (
              <></>
            ) : mintDetails[defaultAccount] ? (
              <button onClick={() => toggleMint(address)}>toggle</button>
            ) : (
              <></>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default DisplayDetails;
