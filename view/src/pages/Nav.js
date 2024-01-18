import { Link } from "react-router-dom";
import logo from "../assets/img/evangadi-logo-home.png";
import { useEffect, useState } from "react";

function Nav() {
  const [sticky, setSticky] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setSticky(window.scrollY > 1);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });
  return (
    <header
      className={`navbar navbar-expand-lg navbar-light bg-light header ${
        sticky ? "sticky" : ""
      }`}
    >
      <nav className="nav container ">
        <div className="logo">
          <img src={logo} alt="Logo Evangadi" />
        </div>
        <div className="navlist ">
          <ul className="ul list-unstyled d-flex navbar-nav text-light">
            <li className="li nav-item p-4">
              <Link className="text-decoration-none nav-txt">Home</Link>
            </li>
            <li className="li nav-item p-4">
              <Link className="text-decoration-none nav-txt">How it work</Link>
            </li>
            <li className=" nav-item p-3">
              <button
                className="nav-btn login-btn btn btn-lg btn-primary "
                value="submit"
              >
                <Link className="text-decoration-none text-light ">
                  Sign In
                </Link>
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Nav;
