import React from "react";
import Layout from "../components/Layout/Layout";

const Policy = () => {
  return (
    <Layout title={"Privacy Policy - Ecommerce app"}>
      <div className="row contactus">
        <div className="col-md-6">
          <img
            src="/images/contactus.jpeg"
            alt="Privacy Policy Page"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
          {/* <h2 className="bg-dark p-2 text-white text-center">ABOUT US</h2> */}
          <p className="text-justify mt-2">privacy policy</p>
          <p className="text-justify mt-2">privacy policy</p>
          <p className="text-justify mt-2">privacy policy</p>
          <p className="text-justify mt-2">privacy policy</p>
          <p className="text-justify mt-2">privacy policy</p>
          <p className="text-justify mt-2">privacy policy</p>
        </div>
      </div>
    </Layout>
  );
};

export default Policy;
