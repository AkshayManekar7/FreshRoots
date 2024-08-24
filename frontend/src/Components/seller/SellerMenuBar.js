import React from "react";
import { NavLink } from "react-router-dom";
import { ListGroup, ListGroupItem } from "reactstrap";
import "./SellerMenuBar.css"; // Import the CSS file for styling

const SellerMenuBar = () => {
  return (
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
  );
};

export default SellerMenuBar;
