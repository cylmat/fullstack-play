import React from "react";
import { useState } from "react"; //@todo move it
import CssSample from "./components/css/CssSample";
import Loader from "./components/Loader";
import Logo from "./components/logo/Logo";
import Tabs from "./components/tab/Tabs";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/favicon.svg";
import './index.css'


function Index() {
  const [count, setCount] = useState(0);

  const display_logo = () => {
      return <div>
        <Logo
          href="https://vitejs.dev"
          src={viteLogo}
          alt="Vite logo"
          classname="logo"
        />
        <Logo
          href="https://react.dev"
          src={reactLogo}
          classname="react"
          alt="React logo"
        />
      </div>
  }

  return (
    <>
      {display_logo()}
      {/*<h1>Vite + React</h1>*/}
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>

      React ⚛️ + Vite ⚡ + Replit 🌀
      
      { /*Tabs*/ }
      <Tabs />
      <Loader />

      { /*Css*/ }
      <CssSample />
    </>
  );
}
export default Index;