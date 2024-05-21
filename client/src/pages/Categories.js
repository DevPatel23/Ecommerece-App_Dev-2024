import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import useCategory from "../hooks/useCategory";
import { Link } from "react-router-dom";

const Categories = () => {
  const categories = useCategory(); //                       aa categories ne GET karva mate HOOk use kari lidhu
  //                                                         etle dar vakht emare GET category mate function ni banavu pade em
  return (
    <Layout title={"All Categories - Ecommerce App"}>
      <div className="container-fluid" style={{ marginTop: "100px" }}>
        <div className="row container">
          {/* simple aa rite "c." lakhi ne use kari skaay */}
          {categories?.map((c) => (
            <div className="col-md-6 mb-3 mt-3 gx-5 gy-5" key={c._id}>
              <Link className="btn btn-lg btn-info" to={`/category/${c.slug}`}>
                {c.name}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Categories;
