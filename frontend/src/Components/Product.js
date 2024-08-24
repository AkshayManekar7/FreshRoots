import React from "react";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import { useStateValue } from "./StateProvider";
import "./Product.css";

function Product({ id, title, image, price, unit, rating }) {
  const [{ basket, user }, dispatch] = useStateValue();

  const addToBasket = () => {
    dispatch({
      type: "ADD_TO_BASKET",
      item: {
        id,
        title,
        image,
        price,
        unit,
        rating,
      },
    });
  };

  const removeFromBasket = () => {
    dispatch({
      type: "REMOVE_FROM_BASKET",
      id,
    });
  };

  return (
    <div className="product">
      <img className="product_image" src={image} alt={title} />

      <div className="product_info">
        <h2 className="product_title">{title}</h2>
        <div className="product_price">
          <span className="currency">₹</span>
          <span className="price_value">{price}</span>
          <span className="price_unit">&nbsp;per {unit}</span>
        </div>
        <div className="product_rating">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <span key={i} className="star">
                ⭐
              </span>
            ))}
        </div>
      </div>

      <div className="product_buttons">
        {user ? (
          <>
            <Button color="danger" outline onClick={removeFromBasket}>
              -
            </Button>
            <Button color="success" onClick={addToBasket}>
              Add to Basket
            </Button>
            <Button color="danger" outline onClick={addToBasket}>
              +
            </Button>
          </>
        ) : (
          <Link className="btn btn-dark product_login_button" to="/login">
            Add to Basket
          </Link>
        )}
      </div>
    </div>
  );
}

export default Product;
