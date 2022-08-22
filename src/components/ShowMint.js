import React, { useEffect } from "react";
import Mint from "./Mint";
function ShowMint({ mintDetails, defaultAccount, contract, updateBalance }) {
  if (mintDetails[defaultAccount])
    return (
      <Mint
        contract={contract}
        currentAccount={defaultAccount}
        updateBalance={updateBalance}
      />
    );
  else return <div> cant </div>;
}

export default ShowMint;
