import { ethers } from "ethers";
import React, { useEffect } from "react";
import { useState } from "react";
import gold_token_abi from "../contracts/gold_token_abi.json";
import DisplayDetails from "./DisplayDetails";
import Interactions from "./Interactions";
import Mint from "./Mint";
import ShowMint from "./ShowMint";
const contractAddress = "0xeCEB7C0aae3cFa4c72EDFC2CD252Aa6FE398d930";
let signer;
function Wallet() {
  const [tokenName, setTokenName] = useState("Token");
  const [connButtonText, setConnButtonText] = useState("Connect Wallet");
  const [defaultAccount, setDefaultAccount] = useState(null);
  const [balance, setBalance] = useState(null);
  const [contract, setContract] = useState(null);
  const [users, setUsers] = useState([]);
  const [mintDetails, setMintDetails] = useState({}); //{address:boolean} whether address can mint or not
  const [provider, setProvider] = useState(null);
  useEffect(() => {
    const fun = async () => {
      const provider = new ethers.providers.JsonRpcProvider(
        "http://localhost:7545"
      );

      const accounts = await provider.listAccounts();
      const res = accounts.map((account) => account.toString().toLowerCase());
      setUsers(res);
    };
    fun();
  }, []);
  const connectWalletHandler = async () => {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      accountChangedHandler(accounts[0]);
      // console.log("accounts is ", accounts);
      setConnButtonText("Wallet Connected");
    }
  };
  const updateTokenName = async () => {
    if (contract) setTokenName(await contract.name());
  };

  const updateBalance = async () => {
    // console.log("in update balance", defaultAccount);
    if (defaultAccount == null) return;

    // console.log("inside if");
    const balanceBigN = await contract.balanceOf(defaultAccount);
    // console.log(balanceBigN);
    let balanceNumber = balanceBigN.toNumber();

    let decimals = await contract.decimals();
    const tokenBalance = balanceNumber / Math.pow(10, decimals);
    console.log("token balance is ", tokenBalance);
    setBalance(tokenBalance);
  };

  const accountChangedHandler = (newAddress) => {
    setDefaultAccount(newAddress);
  };

  const initializeEthers = () => {
    const _provider = new ethers.providers.Web3Provider(window.ethereum);
    signer = _provider.getSigner();
    const contract = new ethers.Contract(
      contractAddress,
      gold_token_abi,
      signer
    );
    setContract(contract);
    console.log(_provider);
    setProvider(_provider);
  };

  useEffect(() => {
    initializeEthers();
  }, []);

  useEffect(() => {
    updateTokenName();
  }, contract);

  window.ethereum.on("accountsChanged", function (accounts) {
    setDefaultAccount(accounts[0]);
  });
  useEffect(() => {
    if (!users) return;

    const interval = setInterval(() => {
      const obj = {};
      users.map(async (address) => {
        address = address.toString().toLowerCase();
        const able = await contract.canMint(address);

        obj[address] = able;
        setMintDetails({ ...mintDetails, ...obj });
      });
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [users]);

  useEffect(() => {
    updateBalance();
  }, [defaultAccount]);
  return (
    <div>
      <h2>{tokenName} </h2>
      <button onClick={connectWalletHandler}>{connButtonText}</button>
      <div>
        <h3>Address : {defaultAccount}</h3>
        <h3>
          {" "}
          {tokenName} Balance:{balance}
          <button onClick={updateBalance}>update</button>
        </h3>
      </div>
      <br />
      --------------------------------------------------------
      {/* {mintDetails[defaultAccount] && (
        <Mint
          contract={contract}
          currentAccount={defaultAccount}
          updateBalance={updateBalance}
        />
      )} */}
      <ShowMint
        mintDetails={mintDetails}
        defaultAccount={defaultAccount}
        contract={contract}
        updateBalance={updateBalance}
      />
      --------------------------------------------------------
      <Interactions contract={contract} updateBalance={updateBalance} />
      <br />
      --------------------------------------------------------
      <DisplayDetails
        users={users}
        contract={contract}
        mintDetails={mintDetails}
        defaultAccount={defaultAccount}
      />
    </div>
  );
}

export default Wallet;
