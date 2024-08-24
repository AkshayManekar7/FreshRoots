import React from "react";
import { NavLink } from "react-router-dom";
import { ListGroup, ListGroupItem } from "reactstrap";
import "./AdminMenuBar.css"; // Import the CSS file

const AdminMenuBar = () => {
  return (
    <div className="sidebar">
      <ListGroup className="sidebar-list">
        <ListGroupItem className="sidebar-item">
          <NavLink className="sidebar-link sidebar-link-dark" exact to="/adminDashboard">
            Admin Dashboard
          </NavLink>
        </ListGroupItem>

        <ListGroupItem className="sidebar-item">
          <NavLink className="sidebar-link sidebar-link-primary" exact to="/users">
            View All Users
          </NavLink>
        </ListGroupItem>

        <ListGroupItem className="sidebar-item">
          <NavLink className="sidebar-link sidebar-link-primary" exact to="/sellers">
            View All Sellers
          </NavLink>
        </ListGroupItem>

        <ListGroupItem className="sidebar-item">
          <NavLink className="sidebar-link sidebar-link-primary" exact to="/admin-allProducts">
            View All Products
          </NavLink>
        </ListGroupItem>

        <ListGroupItem className="sidebar-item">
          <NavLink className="sidebar-link sidebar-link-primary" exact to="/admin-allCategory">
            View All Categories
          </NavLink>
        </ListGroupItem>

        <ListGroupItem className="sidebar-item">
          <NavLink className="sidebar-link sidebar-link-primary" exact to="/allOrders">
            View All Orders
          </NavLink>
        </ListGroupItem>
        {/* <ListGroupItem className="sidebar-item">
          <NavLink className="sidebar-link sidebar-link-primary" exact to="/order">
            Update Order Status
          </NavLink>
        </ListGroupItem> */}
      </ListGroup>
    </div>
  );
};

export default AdminMenuBar;
