import logo from "./logo.svg";
import "./App.css";
import Wallet from "./components/Wallet";
import { useEffect } from "react";
import TokenFactory from "./components/TokenFactory";

function App() {
  return (
    <div className="App">
      {/* <Wallet /> */}
      <TokenFactory />
    </div>
  );
}

export default App;
