import React from "react";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import CheckOutProduct from "./CheckOutProduct";
import "./Payment.css";
import { useStateValue } from "./StateProvider";
import { getBasketTotal } from "./reducer";
import CurrencyFormat from "react-currency-format";
import { useNavigate } from "react-router-dom";

function Payment() {
  const [{ basket, user }, dispatch] = useStateValue();
  const navigate = useNavigate();

  const amt = parseInt(getBasketTotal(basket));
  const orderTotal = parseInt(getBasketTotal(basket));
  const deliveryCharge = orderTotal < 500 ? 40 : 0;
  const platformFee = 3;
  const finalTotal = orderTotal + deliveryCharge + platformFee;

  // Aggregate products by ID and sum their quantities
  const aggregatedBasket = basket.reduce((acc, item) => {
    const itemQuantity = item.quantity ? item.quantity : 1;
    const existingProductIndex = acc.findIndex((product) => product.id === item.id);
    if (existingProductIndex !== -1) {
      acc[existingProductIndex].quantity += itemQuantity;
    } else {
      acc.push({ ...item, quantity: itemQuantity });
    }
    return acc;
  }, []);

  return (
    <div className="payment container-fluid">
      <div className="row">
        {/* Left Side - Checkout Products */}
        <div className="col-md-8 payment_products">
          <h2>
            Checkout (<Link to="">{aggregatedBasket.length} items</Link>)
          </h2>
          {aggregatedBasket.map((item) => (
            <CheckOutProduct
              key={item.id}
              id={item.id}
              image={item.image}
              title={item.title}
              price={item.price}
              unit={item.unit}
              rating={item.rating}
              quantity={item.quantity}
            />
          ))}
        </div>

        {/* Right Side - Address and Payment Summary */}
        <div className="col-md-4">
          {/* Address Section */}
          <div className="payment_section payment_address">
            <h3>Delivery Address</h3>
            <p>{user?.address}</p>
            <p>{user?.city}</p>
            <p>{user?.pin}</p>
          </div>

          {/* Payment Summary */}
          <div className="payment_section payment_summary">
            <h3>Payment Summary</h3>
            <div className="subtotal">
              <CurrencyFormat
                renderText={(value) => (
                  <>
                    <p>Total ({aggregatedBasket.length} items): <strong>{value}</strong></p>
                    <p>Delivery Charges: <strong>{deliveryCharge === 0 ? "Free" : `₹${deliveryCharge}`}</strong></p>
                    <p>Platform Fee: <strong>₹{platformFee}</strong></p>
                    <p>Final Total: <strong>₹{finalTotal}</strong></p>
                  </>
                )}
                decimalScale={2}
                value={orderTotal}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"₹"}
              />
              <Button
                className="mt-3"
                color="primary"
                onClick={() => navigate(`/razorpay/${amt}`)}
              >
                Pay Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
