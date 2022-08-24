import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import goldabi from "../contracts/gold_token_abi.json";
import goldbytecode from "../contracts/gold_bytecode.json";
var factory;
function TokenFactory() {
  const [address, setAddress] = useState([]);
  useEffect(() => {
    const fun = async () => {
      const _provider = new ethers.providers.Web3Provider(window.ethereum);
      await _provider.send("eth_requestAccounts", []);
      const signer = _provider.getSigner();
      factory = new ethers.ContractFactory(goldabi, goldbytecode, signer);
    };
    fun();
  }, []);
  const handleSubmit = async (e) => {
    console.log("e is ", e);
    e.preventDefault();
    const contract = await factory.deploy(
      e.target.name.value,
      e.target.symbol.value
    );
    setAddress([...address, contract.address]);
  };

  return (
    <div>
      <h3>Token Factory </h3>
      <div>
        <form onSubmit={handleSubmit}>
          <input id="name" placeholder="name of token" />
          <input id="symbol" placeholder="symbol" />
          <button type="submit">create token</button>
        </form>
        <ul>
          {address.map((add) => (
            <li key={add}>{add}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TokenFactory;
