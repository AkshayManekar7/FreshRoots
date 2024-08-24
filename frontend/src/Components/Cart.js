import React from "react";
import "./Cart.css";
import CheckOutProduct from "./CheckOutProduct";
import { useStateValue } from "./StateProvider";
import { useNavigate } from "react-router-dom";

function Cart() {
  const [{ basket }, dispatch] = useStateValue();
  const navigate = useNavigate();

  // Group items by ID and sum quantities
  const groupedBasket = basket.reduce((acc, item) => {
    const existingItem = acc.find((product) => product.id === item.id);
    if (existingItem) {
      existingItem.quantity += item.quantity || 1; // Increase quantity if the product already exists
    } else {
      acc.push({ ...item, quantity: item.quantity || 1 }); // Add new product with quantity
    }
    return acc;
  }, []);

  // Calculate total quantity and price after grouping
  const totalQuantity = groupedBasket.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = groupedBasket.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const discount = totalPrice * 0; // 85% discount for demonstration
  const platformFee = 3;
  const deliveryCharge = totalPrice > 500 ? 0 : 40;
  const subtotal = totalPrice - discount + platformFee + deliveryCharge;

  const handlePlaceOrder = () => {
    navigate("/payment");
  };

  return (
    <div className="checkout row">
      <div className="checkout_left col-9">
        <div>
          <h2 className="checkout_title">Your Orders</h2>
          {groupedBasket.map((item) => (
            <CheckOutProduct
              key={item.id}
              id={item.id}
              title={item.title}
              image={item.image}
              price={item.price}
              unit={item.unit}
              rating={item.rating}
              quantity={item.quantity}
            />
          ))}
          <hr></hr>
        </div>
      </div>

      <div className="checkout_right col-3">
        <div className="subtotal_container">
          <h3>Price Details</h3>
          <div className="price_row">
            <span>Price ({totalQuantity} items)</span>
            <span>₹{totalPrice.toFixed(2)}</span>
          </div>
          <div className="price_row">
            <span>Discount</span>
            <span className="discount">-₹{discount.toFixed(2)}</span>
          </div>
          <div className="price_row">
            <span>Platform Fee</span>
            <span>₹{platformFee.toFixed(2)}</span>
          </div>
          <div className="price_row">
            <span>Delivery Charges</span>
            <span>{deliveryCharge === 0 ? "Free" : `₹${deliveryCharge.toFixed(2)}`}</span>
          </div>
          <div className="price_total">
            <span>Total Amount</span>
            <span>₹{subtotal.toFixed(2)}</span>
          </div>
          <div className="price_savings">
            You will save ₹{discount.toFixed(2)} on this order
          </div>
        </div>
        <div className="place_order_btn" onClick={handlePlaceOrder}>
          Place Order
        </div>
      </div>
    </div>
  );
}

export default Cart;
