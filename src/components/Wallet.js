import { ethers } from "ethers";
import React, { useEffect } from "react";
import { useState } from "react";
import gold_token_abi from "../contracts/gold_token_abi.json";
const contractAddress = "0x6B5718C050c6eEb7d102F576195BD64CcEc2F697";
let provider, signer, contract;
function Wallet() {
  const [tokenName, setTokenName] = useState("Token");
  const [connButtonText, setConnButtonText] = useState("Connect Wallet");
  const [defaultAccount, setDefaultAccount] = useState(null);
  const [balance, setBalance] = useState(null);
  const connectWalletHandler = async () => {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      accountChangedHandler(accounts[0]);
      setConnButtonText("Wallet Connected");
    }
  };
  const updateTokenName = async () => {
    setTokenName(await contract.name());
  };

  const updateBalance = async () => {
    if (defaultAccount) {
      const balanceBigN = await contract.balanceOf(defaultAccount);
      console.log(balanceBigN);
      let balanceNumber = balanceBigN.toNumber();
      console.log("balanceNumber", balanceNumber);

      let decimals = await contract.decimals();
      const tokenBalance = balanceNumber / Math.pow(10, decimals);
      setBalance(tokenBalance);
    }
  };

  const accountChangedHandler = (newAddress) => {
    setDefaultAccount(newAddress);
  };

  const initializeEthers = () => {
    provider = new ethers.providers.Web3Provider(window.ethereum);
    signer = provider.getSigner();
    contract = new ethers.Contract(contractAddress, gold_token_abi, signer);
  };

  useEffect(() => {
    initializeEthers();
    updateTokenName();
  }, []);

  useEffect(() => {
    updateBalance();
  }, defaultAccount);
  return (
    <div>
      <h2>{tokenName} + "ERC20 Wallet" </h2>
      <button onClick={connectWalletHandler}>{connButtonText}</button>
      <div>
        <h3>Address : {defaultAccount}</h3>
        <h3>
          {" "}
          {tokenName} Balance:{balance}
        </h3>
      </div>
    </div>
  );
}

export default Wallet;
