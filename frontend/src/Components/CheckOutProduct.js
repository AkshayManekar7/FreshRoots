import React from "react";
import "./CheckOutProduct.css";

function CheckOutProduct({ id, title, image, price, unit, rating, quantity }) {
  return (
    <div className="checkoutProduct">
      <img className="checkoutProduct_image" src={image} alt="" />

      <div className="checkoutProduct_info">
        <p className="checkoutProduct_title">{title}</p>
        <p className="checkoutProduct_price">
          <strong>₹{price.toFixed(2)}</strong>
          <small> / {unit}</small>
        </p>
        <p className="checkoutProduct_quantity">Quantity: {quantity}</p> {/* Add this line */}
        <div className="checkoutProduct_rating">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <p key={i}>⭐</p>
            ))}
        </div>
      </div>
    </div>
  );
}

export default CheckOutProduct;
