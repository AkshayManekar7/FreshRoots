import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import SellerMenuBar from "./SellerMenuBar";
import { url } from "../../common/constants";
import { Button } from "reactstrap";
import "./Product.css";  // Import the custom CSS file

const Product = () => {
  const [category, setCategory] = useState(0);
  const [seller, setSeller] = useState(0);
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [unit, setUnit] = useState("");
  const [productPrice, setProductPrice] = useState(0);
  const [productDiscount, setProductDiscount] = useState(0);
  const [productRating, setProductRating] = useState(0);
  const [productImage, setProductImage] = useState(undefined);

  const history = useNavigate();

  const product = () => {
    const body = new FormData();
    body.append("productName", productName);
    body.append("productDescription", productDescription);
    body.append("quantity", quantity);
    body.append("unit", unit);
    body.append("productPrice", productPrice);
    body.append("productDiscount", productDiscount);
    body.append("productRating", productRating);
    body.append("productImage", productImage);

    axios
      .post(url + `/products/category/${category}/seller/${seller}`, body)
      .then((response) => {
        const result = response.data;

        if (result) {
          alert("succcess");
          history.push("/sellerDashboard");
        } else {
          alert("error");
        }
      });
  };

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("data"));
    setSeller(data.id);
  }, [seller]);

  const dashboard = () => {
    history("/sellerDashboard");
  };

  return (
    <div className="row justify-content-center">
      <SellerMenuBar />

      <div className="col-8 py-2">
        <h2 className="text-center">Add Product</h2>
        <div className="form-container">
          <div className="row">
            <div className="col-6">
              <input
                onChange={(e) => setProductName(e.target.value)}
                className="form-control mb-4"
                type="text"
                placeholder="Product Name"
                required
              />
            </div>
            <div className="col-6">
              <input
                onChange={(e) => setProductDescription(e.target.value)}
                className="form-control mb-4"
                type="text"
                placeholder="Product Description"
                required
              />
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <input
                onChange={(e) => setCategory(e.target.value)}
                className="form-control mb-4"
                type="text"
                placeholder="Category Id"
                required
              />
            </div>
            <div className="col-6">
              <input
                onChange={(e) => setQuantity(e.target.value)}
                className="form-control mb-4"
                type="text"
                placeholder="Quantity"
                required
              />
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <select
                onChange={(e) => setUnit(e.target.value)}
                className="form-control mb-4"
                required
              >
                <option value="" disabled selected>Select Unit</option>
                <option value="kg">Kilograms (kg)</option>
                <option value="g">Grams (g)</option>
                <option value="l">Liters (l)</option>
                <option value="ml">Milliliters (ml)</option>
                <option value="dz">Dozen (doz)</option>
              </select>
            </div>
            <div className="col-6">
              <input
                onChange={(e) => setProductPrice(e.target.value)}
                className="form-control mb-4"
                type="text"
                placeholder="Product Price"
                required
              />
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <input
                onChange={(e) => setProductDiscount(e.target.value)}
                className="form-control mb-4"
                type="text"
                placeholder="Product Discount"
                required
              />
            </div>
            <div className="col-6">
              <input
                onChange={(e) => setProductRating(e.target.value)}
                className="form-control mb-4"
                type="text"
                placeholder="Product Rating"
                required
              />
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <input
                onChange={(e) => setProductImage(e.target.files[0])}
                className="form-control mb-4"
                type="file"
                required
              />
            </div>
          </div>
          <div className="row">
            <div className="col-6 text-center">
              <button onClick={product} className="btn btn-primary btn-block">
                Add Product
              </button>
            </div>
            <div className="col-6 text-center">
              <Button onClick={dashboard} className="btn btn-danger btn-block">
                Back To Dashboard
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
