// Admin ma left ma products ma badha products GET karva mate page

import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);

  //*********************** *****           GETTING ALL PRODUCTS                  ***************************** */
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/get-product");
      setProducts(data.products); //                 data.products -> ma products e API ma thi madse to aa products ne brbr rite lakhvo
    } catch (error) {
      console.log(error);
      toast.error("Someting went wrong");
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <Layout title={"Dashboard - Products"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9 ">
            <h1 className="text-center">All Products List</h1>
            <div className="d-flex flex-wrap">
              {products?.map((p) => (
                <Link
                  key={p._id}
                  to={`/dashboard/admin/product/${p.slug}`}
                  //  je te Product par click kare etle te product khule te route aapyo, have aa new page par UPDATE batavsu,
                  // tya API hit karavi te jovi, aa SLUG params mathi levano
                  // ek rite joiye to aa API --> GET-Single mate ni thai sake te -> HIT karavi
                  className="product-link"
                >
                  <div className="card m-2" style={{ width: "18rem" }}>
                    <img
                      src={`/api/v1/product/product-photo/${p._id}`}
                      //  aapne badhi img ne id na aadhare GET karta chhe --> ane tene single product 'p' mathi access kari sakase, tevi j rite {p.name} thi name access kari sakase
                      //   img ni API alag chhe tene dynamically HIT karavisu
                      className="card-img-top"
                      alt="{p.name}"
                    />
                    <div className="card-body text-center">
                      <h5 className="card-title">{p.name}</h5>
                      <p className="card-text">{p.description}</p>
                      <p className="card-text"> $ {p.price}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
