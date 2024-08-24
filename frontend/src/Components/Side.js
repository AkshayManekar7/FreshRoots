import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SideData } from "./SideData";
import { loadAllCategories } from "../Services/category-service";
import { Search } from "@mui/icons-material";
import "./Side.css"; // Make sure to import the CSS file

function Side() {
  const navigate = useNavigate();
  const [categorylist, setCategorylist] = useState([]);

  useEffect(() => {
    loadAllCategories()
      .then((data) => {
        setCategorylist([...data]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="container">
      <div className="sidebar">
        <div className="sidebar-list">
          {SideData.map((val, key) => (
            <div className="sidebar-row" key={key} onClick={() => navigate(val.link)}>
              <p className="dashboard-title">
                {val.icon}
                <span className="title-text">{val.title}</span>
                <Search className="search-icon" />
              </p>
            </div>
          ))}

          {categorylist &&
            categorylist.map((cat, index) => (
              <div className="sidebar-row" key={index} onClick={() => navigate(`/category/${cat.id}`)}>
                <div className="dashboard-title">
                  <span className="category-text">{cat.categoryName}</span>
                </div>
              </div>
            ))}
        </div>
      </div>
      <div className="main-content">
        {/* Your main content goes here */}
      </div>
    </div>
  );
}

export default Side;
