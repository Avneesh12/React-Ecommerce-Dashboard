import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./navbar.css";

const NavBar = () => {
  const navigate = useNavigate();
  const auth = localStorage.getItem("user");
  // console.log(JSON.parse(auth).name)

  const logout = () => {
    localStorage.clear();
    navigate("/register");
  };

  return (
    <div className="container">
      <div className="logo">
        <span className="navlogo">Avneesh</span>
      </div>
      <div className="navitem">
        <ul>
          {auth ? (
            <>
              <li>
                <NavLink to="/" className="mylink">
                  Products
                </NavLink>
              </li>
              <li>
                <NavLink to="/addproduct" className="mylink">
                  Add Product
                </NavLink>
              </li>
              <li>
                <NavLink to="/update" className="mylink">
                  Update
                </NavLink>
              </li>
              <li>
                <NavLink to="/profile" className="mylink">
                  Profile
                </NavLink>
              </li>
              <li>
                <NavLink to="/register" className="mylink" onClick={logout}>
                  Logout
                </NavLink>
              </li>
              <li>
                <span  className="mylink uname">
                  Hello !! {JSON.parse(auth).name}
                </span>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink to="/register" className="mylink">
                  Sign Up
                </NavLink>
              </li>
              <li>
                <NavLink to="/login" className="mylink">
                  Login
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
