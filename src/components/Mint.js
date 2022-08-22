import React, { useEffect } from "react";

function Mint({ contract, currentAccount, updateBalance }) {
  const handleSubmit = async (e) => {
    console.log(e);
    e.preventDefault();
    await contract.mint(currentAccount, 100 * e.target.cnt.value);
    const supplyBigNum = await contract.totalSupply();
    const supply = supplyBigNum.toNumber();
    // console.log(`supplys ${supply}`);
    updateBalance();
  };

  return (
    <div>
      <h3>Mint</h3>
      <form onSubmit={handleSubmit}>
        <input type="number" id="cnt" />
        <button type="submit">mint</button>
      </form>
    </div>
  );
}

export default Mint;
