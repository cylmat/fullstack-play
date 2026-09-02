import React from "react";
import { useState } from "react"; //@todo move it
import CssSample from "../../components/css/CssSample";
import Loader from "../../components/loader/Loader";
import Logo from "../../components/logo/Logo";
import Tabs from "../../components/tab/Tabs";
import reactLogo from "../../assets/icons/react.svg";
import viteLogo from "../../assets/icons/favicon.svg";
import './index.css'


function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <Logo
          href="https://vitejs.dev"
          src={viteLogo}
          classname="logo"
          alt="Vite logo"
        />
        <Logo
          href="https://react.dev"
          src={reactLogo}
          classname="logo react"
          alt="React logo"
        />
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          App count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <Tabs />
      
      <CssSample />
    </>
  );
}

export default App
