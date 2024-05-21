import React from "react";
import { useState } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

// import toast from "react-hot-toast";
import { toast } from "react-toastify";
import "../../styles/AuthStyles.css";

import { useAuth } from "../../context/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const [auth, setAuth] = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/auth/login", {
        email,
        password,
      });
      if (res.data.success) {
        // alert(res.data.message);
        toast.success(res.data.message);

        //                            setAuth thi set kari desu.. previous values mate '...auth' ane sathe state ni token,user hata te
        setAuth({
          ...auth, //                            auth ma bijji ghani details hoy to tene rakhva pade etle [...auth] vapariye
          user: res.data.user, //                 ane aa auth na user,token ne aapne set karsu..
          token: res.data.token,
        });

        // refresh kare tye data remove thai jay, to e display j rey te mate localstorage ma save karye 'auth' var ma ane useEffet thi dar vakhte display karsu
        localStorage.setItem("auth", JSON.stringify(res.data));
        // aa je setAuth thi data set kariye, ane Homepage.js ma tene display karavta chhe <pre> tag thi ---> tene localStorage ma store karavi nakhya, ane localStorage ma JSON obj ni chake etle tene stringify karva pade
        navigate(location.state || "/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong...");
    }
  };

  return (
    <Layout title={"Login - Ecommerce App"}>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <h1 className="title">LOGIN FORM</h1>

          <div className="mb-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter your Email"
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="current password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Enter your Password"
              required
            />
          </div>

          <div className="mb-3">
            <button
              type="submit"
              className="btn btn-primary"
              onClick={() => navigate("/forgot-password")}
            >
              Forgot Passsword
            </button>
          </div>

          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Login;
