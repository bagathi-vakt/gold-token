import React, { useEffect } from "react";

function Interactions({ contract, updateBalance }) {
  const transferHandler = async (e) => {
    e.preventDefault();
    // console.log("e is ", e);
    const transferAmount = e.target.sendAmount.value * 100;
    const recieverAddress = e.target.recieverAddress.value;

    // console.log(`amt:${transferAmount} reciver :${recieverAddress}`);
    let txt = await contract.transfer(recieverAddress, transferAmount);
    let txReceipt = await txt.wait();
    updateBalance();
    console.log("recipt", txReceipt);
  };
  return (
    <div>
      <form onSubmit={transferHandler}>
        <h3>Transfer Coins</h3>
        <p>Receiver Address</p>
        <input
          id="recieverAddress"
          style={{
            width: "400px",
          }}
        />
        <p>Send Amount (excluding decimals)</p>
        <input type="number" id="sendAmount" />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default Interactions;
