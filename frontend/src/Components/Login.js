import React from "react";
import { useEffect, useState } from "react";
import { login } from "../Services/user-service";
import { toast } from "react-toastify";
import "./Login.css";
import { Form } from "reactstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { doLogin } from "../auth/Index";
import { useStateValue } from "./StateProvider";

function Login() {
  const navigate = useNavigate();
  const [{ user }, dispatch] = useStateValue();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    console.log(data);
  }, [data]);

  const handleChange = (event, property) => {
    setData({ ...data, [property]: event.target.value });
  };

  const resetData = () => {
    setData({
      email: "",
      password: "",
    });
  };

  const Valid = () => {
    if (data.email === "") {
      toast.error("Email field is required", {
        position: "bottom-center",
      });
    } else if (!data.email.includes("@")) {
      toast.error("Please enter a valid email address", {
        position: "bottom-center",
      });
    } else if (data.password === "") {
      toast.error("Password field is required", {
        position: "bottom-center",
      });
    } else if (data.password.length < 5) {
      toast.error("Password length should be greater than five", {
        position: "bottom-center",
      });
    } else {
      return true;
    }
  };

  const submitForm = (event) => {
    event.preventDefault();
    if (Valid()) {
      login(data)
        .then((resp) => {
          doLogin(resp, () => {
            console.log("Login details saved to localStorage");

            dispatch({
              type: "SET_USER",
              user: resp,
            });
          });
          toast.success("User Login Successfully!", {
            position: "top-center",
          });

          sessionStorage.setItem("isLoggedin", true);
          if (resp.role === "seller") {
            navigate("/sellerDashboard");
          } else if (resp.role === "Admin") {
            navigate("/adminDashboard");
          } else navigate("/");
        })
        .catch((error) => {
          console.log("Error log");
          toast.error("Login failed! Enter valid credentials!", {
            position: "top-center",
          });
        });
    }
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    const passwordInput = document.getElementById("password");
    const eyeIcon = document.getElementById("eyeIcon");
    if (passwordInput.type === "password") {
      passwordInput.type = "text";
      eyeIcon.classList.remove("fa-eye");
      eyeIcon.classList.add("fa-eye-slash");
    } else {
      passwordInput.type = "password";
      eyeIcon.classList.remove("fa-eye-slash");
      eyeIcon.classList.add("fa-eye");
    }
  };

  return (
    <div className="container">
      <div className="left-side">
        <div className="branding">
          <img className="logo" src="icon.png" alt="logo" />
          <h1 className="company-name">Always Delivers Fresh...!</h1>
        </div>
      </div>
      <div className="right-side">
        <div className="login-form">
          <h2>Sign In</h2>
          <Form>
            <input
              type="email"
              id="email"
              name="email"
              required
              placeholder="Enter Email"
              onChange={(e) => handleChange(e, "email")}
              value={data.email}
            />
            <div className="password-wrapper">
              <input
                type="password"
                id="password"
                name="password"
                required
                placeholder="Enter Password"
                onChange={(e) => handleChange(e, "password")}
                value={data.password}
              />
              <i id="eyeIcon" className="fa fa-eye" onClick={togglePasswordVisibility}></i>
            </div>
            <button className="login-signInButton" onClick={submitForm}>
              Sign In
            </button>
            <button className="login-resetButton" onClick={resetData}>
              Reset
            </button>
          </Form>
          <div className="additional-options">
            <p className="login-terms">
              By continuing, you agree to our <a href="/terms">Terms of Service</a>
            </p>
            <Link to="/signup" className="login-registerButton" id="regbtn">Create New Account</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
