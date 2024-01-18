import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../components/axiosConfig";
import "./Login.css";
function Login() {
  const navigate = useNavigate();
  const emailDom = useRef();
  const passwordDom = useRef();
  async function handleSubmit(e) {
    e.preventDefault();
    const emailValue = emailDom.current.value;
    const passValue = passwordDom.current.value;
    if (!emailValue || !passValue) {
      alert("Please fill out all fields");
      return;
    }
    try {
      const { data } = await axios.post("/users/login", {
        email: emailValue,
        password: passValue,
      });
      alert("you have successfully Logged in. ");
      localStorage.setItem("token", data.token);
      // console.log(data);
      navigate("/home");
    } catch (error) {
      alert(error?.response?.data?.msg);
      console.log(error.message);
    }
  }
  return (
    <section className="px-4  login text-center authfy-panel panel-login text-center active">
      <div class="authfy-heading">
        <h3 className="auth-title">Login to your account</h3>
        <p>
          Don’t have an account?{" "}
          <Link className="lnk-toggler" to={"/register"}>
            Create new Account
          </Link>
        </p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="wrap-input">
          <input
            className="login-input form-control input-lg"
            ref={emailDom}
            type="email"
            placeholder="Email address"
          />
        </div>
        <br />
        <div className="form-group">
          <input
            className="login-input form-control input-lg"
            ref={passwordDom}
            type="password"
            placeholder="Password"
          />
        </div>
        <div className="text-end">
          <Link className="lnk-toggler" to={"/register"}>
            Forgot password
          </Link>
        </div>

        <br />
        <div className="form-group">
          <button
            className="login-btn btn btn-lg btn-primary btn-block"
            type="submit"
          >
            Login
          </button>
        </div>
      </form>
    </section>
  );
}

export default Login;
