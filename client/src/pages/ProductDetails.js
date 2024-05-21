import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../styles/ProductDetailsStyles.css";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import { toast } from "react-toastify";

const ProductDetails = () => {
  const params = useParams();
  const [product, setProduct] = useState({}); //                     single product madse etle object{} lakhyo
  const [relatedProducts, setRelatedProducts] = useState([]);
  const navigate = useNavigate();
  const [cart, setCart] = useCart();

  //
  //********************                   get Product by clicking moreDetails                ****************//

  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/get-product/${params.slug}` //              single GET karvamate ni API hit karaveli chhe
      );
      setProduct(data?.product);
      getSimilarProducts(data?.product._id, data?.product.category._id); //       simple MORE btn pe click kre tyre aa display krsu etle ahi lakhyu
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  //******************                 get SIMILAR product               ********************* */
  const getSimilarProducts = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products); //                      Similar vali API ma je products chhe tema thi
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title={"Product Details - Ecommerce App"}>
      {/* {JSON.stringify(product, null, 4)} */}
      {/* //card ane flex-row class aapisu to j side ma details aavse */}
      <div className="container fluid mt-3 card flex-row product-details">
        <div className="col-md-5">
          <img
            src={`/api/v1/product/product-photo/${product._id}`}
            className="card-img-top mt-1"
            alt={product.name}
            key={product._id}
            height={"300px"}
            width={"0px"}
          />
        </div>
        <div className="col-md-6 m-2 product-details-info">
          <h3 className="text-center">Product Details</h3>
          <hr />
          <h6>Product Name: {product.name}</h6>
          <h6>Desciption: {product.description}</h6>
          {/* <h6>Price: ${product.price}</h6> */}
          Price :
          <h6 className="font-color">
            {product?.price?.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </h6>
          <h6>Category: {product?.category?.name}</h6>
          {/* <button className="btn btn-primary ms-1">Add To Cart</button> */}
          <button
            className="btn btn-dark ms-1"
            onClick={() => {
              setCart([...cart, product]);
              localStorage.setItem("cart", JSON.stringify([...cart, product]));
              toast.success("Item Added to cart");
            }}
          >
            ADD TO CART
          </button>
        </div>
      </div>
      <hr />
      <div className="row container similar products mt-3 mb-0">
        {/* {JSON.stringify(relatedProduct, null, 4)} */}

        <h3>Similar Products</h3>
        {/*                condition jo similar products available hot to j display thase te               */}
        {relatedProducts?.length < 1 && <p>No products available</p>}

        {/* Similar vadi API ne map krye */}
        <div className="d-flex flex-wrap">
          {relatedProducts?.map((p) => (
            <div className="card m-2" style={{ width: "18rem" }}>
              <img
                src={`/api/v1/product/product-photo/${p._id}`}
                //  aapne badhi img ne id na aadhare GET karta chhe --> ane tene single product 'p' mathi access kari sakase, tevi j rite {p.name} thi name access kari sakase
                //   img ni API alag chhe tene dynamically HIT karavisu
                className="card-img-top"
                alt="{p.name}"
                key={p._id}
              />
              {/* <div className="card-body">
                <h5 className="card-title">{p.name}</h5>
                <p className="card-text">{p.description.substring(0, 30)}...</p>
                <p className="card-text"> $ {p.price}</p>
                <button className="btn btn-primary ms-2">Add To Cart</button>
              </div> */}
              <div className="card-body">
                <div className="card-name-price d-flex flex-wrap">
                  <h5 className="card-title">{p.name}</h5>
                  <h5 className="card-title card-price font-color ms-auto">
                    {p.price.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}
                  </h5>
                </div>
                <p className="card-text ">
                  {p.description.substring(0, 60)}...
                </p>
                <div>
                  <button
                    className="btn btn-info fw-bold"
                    onClick={() => navigate(`/product/${p.slug}`)}
                  >
                    More Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
