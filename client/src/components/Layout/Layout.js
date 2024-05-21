import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Helmet } from "react-helmet";
// import { Toaster } from "react-hot-toast";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Layout = ({ children, title, description, keywords, author }) => {
  ///        ni jagya e khali {children} lakhu to pn chali jaay
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        {/* badha pages par diff content aave te mate aa rite PROPS {} jevu use karyu */}
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title}</title>
      </Helmet>
      <Header />
      <main style={{ minHeight: "72vh" }}>
        {/* <Toaster /> */}
        <ToastContainer />

        {children}
      </main>
      {/*to ahi direct children lakhe to chale */}
      <Footer />
    </div>
  );
};

Layout.defaultProps = {
  title: "E-commerce App - Shop Now",
  description: "mern stack project",
  keywords: "mern, react, node, express, mongodb, frontend, backend",
  author: "DevPatel",
};

export default Layout;
