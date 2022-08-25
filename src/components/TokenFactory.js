import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import factory_abi from "../contracts/factory_abi.json";
const contractAddress = "0x93e1Bd666c2670A6576794e656c120ECa2ddDD14";
function TokenFactory() {
  useEffect(() => {
    const fun = async () => {
      const _provider = new ethers.providers.Web3Provider(window.ethereum);
      await _provider.send("eth_requestAccounts", []);
      const signer = _provider.getSigner();

      const contract = new ethers.Contract(
        contractAddress,
        factory_abi,
        signer
      );

      contract.on("ERC20TokenCreated", (address) => {
        console.log(`address is ${address}`);
      });
      console.log(contract);
      const tx = await contract.deployNewERC20Token("doge", "dog", 2, 1000);
      const recipt = await tx.wait();

      console.log(tx);
      console.log(recipt);
    };
    fun();
  }, []);

  return (
    <div>
      <h3>Token Factory </h3>
    </div>
  );
}

export default TokenFactory;
