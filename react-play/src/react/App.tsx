import { useState } from "react";
import CssSample from "./components/css/CssSample";
import Logo from "./components/logo/Logo";
import Tabs from "./components/tab/Tabs";
import reactLogo from "./assets/react.svg";
import viteLogo from "/favicon.svg";
import "./App.css";

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
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <CssSample />
    </>
  );
}

export default App
