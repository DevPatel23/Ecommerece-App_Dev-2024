import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import "../styles/CartStyles.css";
import { AiFillWarning } from "react-icons/ai";

const CartPage = () => {
  // contexts
  const [cart, setCart] = useCart();
  const [auth, setAuth] = useAuth();
  //for payment states
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  //*********************        remove button function          ********************//
  //                                         aa ni understanding NOTE ma thi vachvi khbr padi jase...
  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart)); // local storage ma thi remove karva mate
      toast.success("Cart Item Removed");
    } catch (error) {
      console.log(error);
    }
  };

  // ***********************            total price Function                  ********************//
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => (total = total + item.price));
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    } catch (error) {
      console.log(error);
    }
  };

  // ***********************            For PAYMENT Function                  ********************//
  //             Token GET karva mate nu Function           //
  const getToken = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/braintree/token");
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getToken();
  }, [auth?.token]);

  //        Make Payment - handlePayment button         //

  const handlePayment = async () => {
    try {
      setLoading(true);
      // nonce e documentation ma chhe etle lakhyu ane e instance mathi madse
      // etle j backend ma API ma pn lakhyu hatu
      const { nonce } = await instance.requestPaymentMethod(); //
      const { data } = await axios.post("/api/v1/product/braintree/payment", {
        nonce,
        cart,
      });
      setLoading(false);

      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/orders");
      toast.success("Payment Completed Successfully");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <Layout title={"User Cart - Ecommerce App"}>
      <div className="container mt-3">
        <div className="row">
          <h2 className="text-center bg-light">
            {/* login user mate msg */}
            {`Hello ${auth?.token && auth?.user?.name}`}
          </h2>
          <h4 className="text-center bg-light">
            {cart.length
              ? `You have ${cart.length} items in your Cart.
            ${auth?.token ? "" : "Please Login for Checkout"}`
              : "Your Cart is empty"}
          </h4>
        </div>
        <div className="row mt-3">
          <div className="col-md-7">
            {cart?.map((p) => (
              <div className="row mb-3 card flex-row">
                <div className="col-md-4">
                  <img
                    src={`/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                    key={p._id}
                    height={"200px"}
                    width={"100px"}
                  />
                </div>
                <div className="col-md-8">
                  <p>{p.name}</p>
                  <p>{p.description.substring(0, 30)}...</p>
                  <p>Price: {p.price}</p>
                  <button
                    className="btn btn-danger"
                    onClick={() => removeCartItem(p._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="col-md-4 text-center">
            <h2>Cart Summary</h2>
            <p>Total | Checkout | Payment</p>
            <hr />
            <h2>Total : {totalPrice()}</h2>

            {/*Checkout mate ane update address button mate */}
            {auth?.user?.address ? (
              <>
                <div className="mt-3">
                  <h5>Current Address :</h5>
                  <h6>{auth?.user?.address}</h6>
                  <button
                    className="btn btn-outline-warning"
                    onClick={() => navigate("/dashboard/user/profile")}
                  >
                    Update Address
                  </button>
                </div>
              </>
            ) : (
              <div className="mt-3">
                {auth?.token ? (
                  <button className="btn btn-outline-warning">
                    Update Address
                  </button>
                ) : (
                  <button
                    className="btn btn-outline-warning"
                    onClick={() => navigate("/login", { state: "/cart" })}
                  >
                    Please login to checkout
                  </button>
                )}
              </div>
            )}
            <div className="mt-3">
              {!clientToken || !cart?.length ? (
                ""
              ) : (
                <>
                  <DropIn
                    options={{
                      authorization: clientToken,
                      paypal: { flow: "vault" },
                    }}
                    onInstance={(instance) => setInstance(instance)}
                  />
                  <button
                    className="btn btn-primary"
                    onClick={handlePayment} //                            payment click kre tyre mate nu fucntion
                    disabled={loading || !instance || !auth?.user?.address}
                  >
                    {/* payment */}
                    {loading ? "Processing..." : "Make Payment"}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
