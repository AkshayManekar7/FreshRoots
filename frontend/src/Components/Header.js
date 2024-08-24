import React, { useState, useEffect } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import Badge from "@mui/material/Badge";
import { doLogout, getCurrentUserDetails, isLoggedIn } from "../auth/Index";
import { useStateValue } from "./StateProvider";
import "./Header.css";
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";

const Header = () => {
  const [{ basket, user }, dispatch] = useStateValue();
  const navigate = useNavigate();
  const location = useLocation();

  const [login, setLogin] = useState(false);
  const [username, setUsername] = useState(undefined);

  useEffect(() => {
    setLogin(isLoggedIn());
    setUsername(getCurrentUserDetails());
  }, [login, user]);

  const logout = () => {
    doLogout(() => {
      setLogin(false);
      dispatch({
        type: "SET_USER",
        user: null,
      });
      navigate("/home");
    });
  };

  const showProfile = () => {
    navigate(`/profile/${user.id}`);
  };

  const resp = JSON.parse(localStorage.getItem("data"));

  // Prevent rendering Header on login and signup pages
  if (location.pathname === "/login" || location.pathname === "/signup") {
    return null;
  }

  return (
    <Navbar className="nav-bar-bg">
      <Nav className="me-auto">
        <NavLink to="/home" className="text-decoration-none">
          <h1>Fresh Roots</h1>
        </NavLink>
      </Nav>

      <Nav>
        <NavLink to="/cart" className="text-decoration-none text-light mx-5">
          <Badge badgeContent={basket?.length} color="primary">
            <i
              className="fa-solid fa-cart-shopping"
              style={{ fontSize: 25, cursor: "pointer" }}
            ></i>
          </Badge>
        </NavLink>

        {login && (
          <>
            <UncontrolledDropdown className="drop_down">
              <DropdownToggle caret>
                My Account
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem onClick={showProfile}>Profile</DropdownItem>
                <DropdownItem
                  onClick={() => {
                    if (resp.role === "seller") {
                      navigate("/sellerDashboard");
                    } else if (resp.role === "admin") {
                      navigate("/adminDashboard");
                    } else navigate("/");
                  }}
                >
                  Dashboard
                </DropdownItem>
                <DropdownItem>My Orders</DropdownItem>
                <DropdownItem onClick={logout}>
                  Logout
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>

            <NavLink to="#" className="text-decoration-none text-light mx-5">
              <h4>{user?.name}</h4>
            </NavLink>
          </>
        )}

        {!login && (
          <NavLink
            to="/login"
            className="text-decoration-none text-light mx-5"
          >
            <h4>Login</h4>
          </NavLink>
        )}
      </Nav>
    </Navbar>
  );
};

export default Header;
