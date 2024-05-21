import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { toast } from "react-toastify";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
//css
import { AiOutlineReload } from "react-icons/ai";
import "../styles/Homepage.css";

const Homepage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]); //             category filter
  const [radio, setRadio] = useState([]); //                 price filter
  const [total, setTotal] = useState(0); //                  product na count mate
  const [page, setPage] = useState(1); //                    page mate
  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useCart(); //                      Cart context ni global state

  //
  //*********************** *****           GETTING ALL PRODUCTS                  ***************************** */
  const getAllProducts = async () => {
    try {
      setLoading(true);
      // have filter aavi gayu etle getAllProducts vali API ne Change kari ne, per-page API lakhi
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error("Someting went wrong");
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  //
  //***************************             GETTING all categories    ************************************
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");

      if (data?.success) {
        setCategories(data?.category);
        // toast.success("Category List");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  // filter aavi gayu etle ahi condition lagava padse
  useEffect(() => {
    if (!checked.length || !radio.length) getAllCategory();
  }, [checked.length, radio.length]);

  //
  //***************************             FILTER by Categories    ************************************
  //je 2 value handleFilter ma niche hati te j ahi aapi
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  //
  //***************************             FILTER Operation    ************************************
  const filterProduct = async () => {
    try {
      const { data } = await axios.post("/api/v1/product/product-filter", {
        checked,
        radio,
      });
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  //
  //***************************             GET total Count    ************************************
  const getTotal = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/product-count");
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getTotal();
  }, []);

  //***************************             Load more button function    ************************************
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  return (
    <Layout title={"E-commerce App | Best Offers"}>
      {/* banner image */}
      <img
        src="/images/banner.png"
        className="banner-img"
        alt="bannerimage"
        width={"100%"}
      />
      {/* banner image */}
      <div className="container-fluid">
        <div className="row m-3">
          {/* filter by category */}
          <div className="col-md-3 filters">
            <h4 className="text-center">Filter By Category</h4>
            <div className="d-flex flex-column mb-4">
              {categories?.map((c) => (
                <Checkbox
                  key={c._id}
                  onChange={(e) => handleFilter(e.target.checked, c._id)} //             filter mate ni value {handleFilter} thi madse
                >
                  {c.name}
                </Checkbox>
              ))}
            </div>

            {/* filter by price */}
            <div className="md-3">
              <h4 className="text-center">Filter By Price</h4>
              <div className="d-flex flex-column">
                {/* onchange thi j FILTER thase */}
                <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                  {Prices?.map((p) => (
                    <div key={p._id}>
                      <Radio value={p.array}>{p.name}</Radio>
                      {/* id na adhare behind scene Value thi work krsu etle p.array lakhyo, Ane aa value ONChange thi madse */}
                    </div>
                  ))}
                </Radio.Group>
              </div>
            </div>
            <div className="d-flex flex-column mt-3">
              <button
                className="btn btn-danger"
                onClick={() => window.location.reload()}
              >
                RESET FILTER
              </button>
            </div>
          </div>

          <div className="col-md-9">
            <h2 className="text-center">All Products</h2>

            {/* {JSON.stringify(checked, null, 4)}
            {JSON.stringify(radio, null, 4)} */}

            <div className="d-flex flex-wrap">
              {products?.map((p) => (
                <div className="card m-2" style={{ width: "18rem" }}>
                  <img
                    src={`/api/v1/product/product-photo/${p._id}`}
                    //  aapne badhi img ne id na aadhare GET karta chhe --> ane tene single product 'p' mathi access kari sakase, tevi j rite {p.name} thi name access kari sakase
                    //   img ni API alag chhe tene dynamically HIT karavisu
                    className="card-img-top"
                    alt="{p.name}"
                    key={p._id}
                  />
                  <div className="card-body">
                    <div className="card-name-price d-flex flex-wrap">
                      <h5 className="card-title ">{p.name}</h5>
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
                    <div className="card-name-price">
                      <button
                        className="btn btn-info ms-1 fw-bold"
                        onClick={() => navigate(`/product/${p.slug}`)}
                      >
                        More Details
                      </button>
                      <button
                        className="btn btn-dark ms-1"
                        onClick={() => {
                          setCart([...cart, p]);
                          localStorage.setItem(
                            "cart",
                            JSON.stringify([...cart, p])
                          );
                          toast.success("Item Added to cart");
                        }}
                      >
                        ADD TO CART
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* <div className="m-3 p-3">
            {products && products.length < total && (
              <button
                className="btn btn-warning"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {laoding ? "Loading" : "Load More"}
              </button>
            )}
          </div> */}
          <div className="m-2 p-3">
            {products && products.length < total && (
              <button
                className="btn loadmore"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? (
                  "Loading ..."
                ) : (
                  <>
                    {" "}
                    Load more <AiOutlineReload />
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Homepage;
