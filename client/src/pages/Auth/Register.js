import React from "react";
import { useState } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// import toast from "react-hot-toast";
import { toast } from "react-toastify";
import "../../styles/AuthStyles.css";

const Register = () => {
  // aa useState HOOK mate note ma teory jovi
  // HOOK => [getter fucntion, setter function]
  const [name, setName] = useState(""); //                   user value ne aa variable thi store krsu ne, jyre API request aavse tyre aapi value pass karai desu
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    // refresh ni thase have niche ni line lakhe to
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/auth/register", {
        //    handling register API request
        name,
        email,
        password,
        phone,
        address,
        answer,
      });
      if (res.data.success) {
        // alert(res.data.message);
        toast.success(res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong...");
    }
  };

  return (
    <Layout title={"Register - Ecommerce App"}>
      <div className="form-container">
        {/* form fill kre tyre RELOAD/refresh ne remove krva mate aa onSubmit */}
        <form onSubmit={handleSubmit}>
          <h1 className="title">REGISTER FORM</h1>
          <div className="mb-3">
            {/* <label htmlFor="exampleInputName" className="form-label">
              Name
            </label> */}
            <input
              type="text"
              value={name} //                    input ni value sathe bind karu chhu      //
              className="form-control"
              onChange={(e) => setName(e.target.value)} // koi pn field ma initially lakhay nai, lakhay te mate aa EVENT nakhi chhe
              id="exampleInputName"
              placeholder="Enter your Name"
              required
            />
          </div>

          <div className="mb-3">
            {/* <label htmlFor="exampleInputEmail1" className="form-label">
              Email
            </label> */}
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
            {/* <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label> */}
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
            {/* <label htmlFor="exampleInputName" className="form-label">
              Phone No.
            </label> */}
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="form-control"
              id="exampleInputPhone"
              placeholder="Enter your Phone no."
              required
            />
          </div>

          <div className="mb-3">
            {/* <label htmlFor="exampleInputName" className="form-label">
              Address
            </label> */}
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="form-control"
              id="exampleInputAddress"
              placeholder="Enter your Address"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="form-control"
              id="exampleInputAddress"
              placeholder="What is your Favourite Sport?"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Register;
