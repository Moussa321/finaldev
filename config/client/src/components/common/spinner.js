import React from "react";
import Spinner from "./Spinner.gif";

export default function spinner() {
  return (
    <div>
      <img
        src={Spinner}
        style={{ width: "100px", margin: "auto", display: "block" }}
        alt="Loading..."
      />
    </div>
  );
}
