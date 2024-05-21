import React, { useState, useEffect } from "react";
import UserMenu from "../../components/Layout/UserMenu";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { useAuth } from "../../context/auth";
import moment from "moment";

const Orders = () => {
  // states
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();

  // getting users ORDERS
  const getUserOrders = async () => {
    try {
      const { data } = await axios.get("/api/v1/auth/orders"); //API hit USER na ORDER GET karva vadi
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getUserOrders();
  }, [auth?.token]);

  return (
    <Layout title={"Dashboard - Your Orders"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9 p-3">
            <h1>Your Orders</h1>
            {orders.map((o, i) => {
              return (
                <div className="border shadow">
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Status</th>
                        <th scope="col">Buyer</th>
                        <th scope="col">Date</th>
                        <th scope="col">Payment</th>
                        <th scope="col">Quantity</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{i + 1}</td>
                        <td>{o?.status}</td>
                        <td>{o?.buyer?.name}</td>
                        {/* aa je controller ma orderModel mathi buyer-name made te chhe */}
                        <td>{moment(o?.createdAt).fromNow()}</td>
                        <td>{o?.payment.success ? "Success" : "Failed"}</td>
                        <td>{o?.products?.length}</td>
                        {/* aa controller ma je products made chhe orderModel mathi */}
                      </tr>
                    </tbody>
                  </table>
                  <div className="container">
                    {o?.products.map((p, i) => (
                      <div className="row mb-3 card flex-row">
                        <div className="col-md-4">
                          <img
                            src={`/api/v1/product/product-photo/${p._id}`}
                            className="card-img-top"
                            alt="{p.name}"
                            key={p._id}
                            height={"200px"}
                            width={"100px"}
                          />
                        </div>
                        <div className="col-md-8">
                          <p>{p.name}</p>
                          <p>{p.description.substring(0, 30)}...</p>
                          <p>Price: {p.price}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
