import React from "react";
import Layout from "../components/Layout/Layout";
import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi";

const Contact = () => {
  return (
    <Layout title={"Contact Us - Ecommerce App"}>
      <div className="row contactus">
        <div className="col-md-6">
          <img
            src="/images/contactus.jpeg"
            alt="Contact Us"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
          <h2 className="bg-dark p-2 text-white text-center">CONTACT US</h2>
          <p className="mt-2">
            Any query and information about product, feel free to call anytime.
            We are 24x7 available
          </p>
          <p className="mt-3">
            <BiMailSend /> : www.help@ecommerce.com
          </p>
          <p className="mt-3">
            <BiPhoneCall /> : 012-3456789
          </p>
          <p className="mt-3">
            <BiSupport /> : 1800-1000-0000 (toll free)
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
