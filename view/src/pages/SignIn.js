import React from "react";
import Register from "./Register";
import About from "./About";

function SignIn() {
  return (
    <div className="sign-up">
      <div className="container">
        <div className="row ">
          <div className="col">
            <Register />
          </div>
          <div className="col">
            <About />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
