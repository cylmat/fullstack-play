import React from "react";
import styled from "styled-components";
import "./css-style.scss";

// @https://css-tricks.com/different-ways-to-write-css-in-react/
// @https://styled-components.com/docs/basics

const WrapperCss = styled.div`
    border-width: 1x;
  `;

const CssSample = () => {
  const style = {
    classA: { borderColor: "black" },
  };
  
  return (
    <div style={{ display: "none" }}>
      <div className="css-sample">a</div>
      <div style={{ color: "green" }}>b</div>
      <div style={style.classA}>c</div>
      <WrapperCss id="blop" className="over">
        d
      </WrapperCss>
    </div>
  );
};
  
export default CssSample;
