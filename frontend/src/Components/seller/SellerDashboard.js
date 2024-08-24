import React from "react";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { NavLink } from "react-router-dom";
import { ListGroup, ListGroupItem } from "reactstrap";
import "./SellerDashboard.css"; // Import the CSS file for styling

const SellerDashboard = () => {
  useEffect(() => {}, []);

  return (
    <div className="seller-dashboard-container">
      <Toaster position="center" reverseOrder={true} />

      <div className="seller-sidebar">
        <ListGroup className="seller-menu">
          <ListGroupItem className="seller-menu-item">
            <NavLink exact to="/sellerDashboard" className="seller-nav-link">
              Seller Dashboard
            </NavLink>
          </ListGroupItem>
          <ListGroupItem className="seller-menu-item">
            <NavLink exact to="/addProduct" className="seller-nav-link">
              Add Product
            </NavLink>
          </ListGroupItem>
          <ListGroupItem className="seller-menu-item">
            <NavLink exact to="/addCategory" className="seller-nav-link">
              Add Category
            </NavLink>
          </ListGroupItem>
          <ListGroupItem className="seller-menu-item">
            <NavLink exact to="/allProducts" className="seller-nav-link">
              View All Products
            </NavLink>
          </ListGroupItem>
          <ListGroupItem className="seller-menu-item">
            <NavLink exact to="/allCategory" className="seller-nav-link">
              View All Categories
            </NavLink>
          </ListGroupItem>
        </ListGroup>
      </div>

      <div className="seller-main-content">
        <h1 className="seller-welcome">Welcome to Fresh Basket Seller Section</h1>
        <h2 className="seller-company-name">
          {JSON.parse(sessionStorage.getItem("seller"))?.companyName}
        </h2>
      </div>
    </div>
  );
};

export default SellerDashboard;
