import React from "react";
import { Spinner } from "reactstrap"; // Import Reactstrap Spinner component

const Loader = () => {
  return (
    <div className="pt-40 text-center text-5xl text-red-400">
      <Spinner
        color="primary"
        style={{
          width: "10vmax",
          height: "10vmax",
          alignItems: "center",
          marginLeft: "550px",
        }}
      />
    </div>
  );
};

export default Loader;