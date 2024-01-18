import React from "react";
import Login from "./Login";
import About from "./About";

function SignUp() {
  return (
    <div className="sign-up ">
      <div className="container tinshua">
        <div className="row">
          <div className="col-md col-xs-1">
            <Login />
          </div>
          <div className="col-md col-xs-1">
            <About />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
