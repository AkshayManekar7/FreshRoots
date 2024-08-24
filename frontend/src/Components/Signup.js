import React, { useEffect, useState } from "react";
import { signup } from "../Services/user-service";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import "./SignUp.css";
import { Form } from "reactstrap";
import { useNavigate } from "react-router-dom";

function Signup() {
  const history = useNavigate();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    city: "",
    pin: "",
    address: "",
    phone: "",
    role: "",
  });

  useEffect(() => { }, [data]);

  const handleChange = (event, property) => {
    setData({ ...data, [property]: event.target.value });
  };
  const resetData = () => {
    setData({
      name: "",
      email: "",
      password: "",
      city: "",
      pin: "",
      address: "",
      phone: "",
      role: "",
    });
  };

  const Valid = () => {
    if (data.name === "") {
      toast.error("Name field is required!", {
        position: "bottom-center",
      });
    } else if (data.email === "") {
      toast.error("Email field is required", {
        position: "bottom-center",
      });
    } else if (!data.email.includes("@")) {
      toast.error("Please enter a valid email address", {
        position: "bottom-center",
      });
    } else if (data.city === "") {
      toast.error("City field is required", {
        position: "bottom-center",
      });
    } else if (data.pin === "") {
      toast.error("Pin field is required", {
        position: "bottom-center",
      });
    } else if (data.phone === "") {
      toast.error("Phone field is required", {
        position: "bottom-center",
      });
    } else if (data.role === "") {
      toast.error("Role field is required", {
        position: "bottom-center",
      });
    } else if (data.password === "") {
      toast.error("Password field is required", {
        position: "bottom-center",
      });
    } else if (data.password.length < 5) {
      toast.error("Password length must be greater than five", {
        position: "bottom-center",
      });
    } else {
      console.log("Data added successfully");
      return true;
    }
  };

  const submitForm = (event) => {
    event.preventDefault();
    if (Valid()) {
      signup(data)
        .then((resp) => {
          console.log(resp);
          toast.success("User registered successfully!", {
            position: "top-center",
          });
          history("/login");
        })
        .catch((error) => {
          console.log("Error occurred");
          toast.error("User registration failed! Please enter valid details.", {
            position: "top-center",
          });
        });
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-container">
        <h1>Sign-Up</h1>
        <Form className="signup-form">
          <div className="form-group">
            <input
              type="text"
              id="name"
              name="name"
              required
              placeholder="Enter Name"
              onChange={(e) => handleChange(e, "name")}
              value={data.name}
            />
            <input
              type="email"
              id="email"
              name="email"
              required
              placeholder="Enter Email"
              onChange={(e) => handleChange(e, "email")}
              value={data.email}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              id="password"
              name="password"
              required
              placeholder="Enter Password"
              onChange={(e) => handleChange(e, "password")}
              value={data.password}
            />
            <select
              id="role"
              name="role"
              placeholder="Select Role From Dropdown"
              onChange={(e) => handleChange(e, "role")}
              value={data.role}
            >
              <option value="Select">Select</option>
              <option value="User">User</option>
              <option value="Admin">Admin</option>
              <option value="Seller">Seller</option>
            </select>
          </div>
          <div className="form-group">
            <input
              type="text"
              id="phone"
              name="phone"
              required
              placeholder="Enter Phone"
              onChange={(e) => handleChange(e, "phone")}
              value={data.phone}
            />
            <input
              type="text"
              id="address"
              name="address"
              required
              placeholder="Enter Address"
              onChange={(e) => handleChange(e, "address")}
              value={data.address}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              id="city"
              name="city"
              required
              placeholder="Enter City"
              onChange={(e) => handleChange(e, "city")}
              value={data.city}
            />
            <input
              type="text"
              id="pin"
              name="pin"
              required
              placeholder="Enter Pin"
              onChange={(e) => handleChange(e, "pin")}
              value={data.pin}
            />
          </div>
          <div className="form-buttons">
            <button
              className="btn-primary"
              onClick={submitForm}
              type="submit"
            >
              Sign Up
            </button>
            <button className="btn-reset" onClick={resetData} type="button">
              Reset
            </button>
          </div>
        </Form>
        <Link to="/login" className="login-link">
          Already have an account? Sign in
        </Link>
      </div>
    </div>
  );
}

export default Signup;
