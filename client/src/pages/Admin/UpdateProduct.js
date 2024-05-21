import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import { useNavigate, useParams } from "react-router-dom";

import { toast } from "react-toastify";
import axios from "axios";

import { Select } from "antd";
const { Option } = Select;

const UpdateProduct = () => {
  const navigate = useNavigate();
  const params = useParams();

  const [categories, setCategories] = useState([]);
  const [photo, setPhoto] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [id, setId] = useState("");

  //***************************             GETTING all categories    ************************************
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");

      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
      // alert("Something went wrong");
    }
  };

  //Life-cycle method
  useEffect(() => {
    getAllCategory();
  }, []);

  //***********************************             GETTING SINGLE PRODUCT            **********************************

  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/get-product/${params.slug}` //                   ahi to GET-Single ni API j HIT karvani
        //                                           Slug to params ma thi leva pade --> je aapne product select karsu etle madi j jase
      );
      //                       have UpdatePage khule tyre badhi formfield Filled hot te mate aa karvu
      setName(data.product.name);
      setDescription(data.product.description);
      setPrice(data.product.price);
      setQuantity(data.product.quantity);
      setShipping(data.product.shipping);
      setCategory(data.product.category._id);
      photo && setPhoto(data.product.photo); // jo photo made to j aa run thase
      setId(data.product._id); // category ID thi made chhe etle aa lakhva padi
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getSingleProduct();
    //eslint-disable-next-line
  }, []);

  //*****************************                   UPDATE PRODUCT Function               ********************************//
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData(); // FormData banavyo --> productData name no
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("shipping", shipping);
      productData.append("category", category);
      photo && productData.append("photo", photo);

      const { data } = await axios.put(
        `/api/v1/product/update-product/${id}`, // update mate ni API hit karavi ${id} thi
        productData
      );

      if (data?.success) {
        toast.success(data?.message);
        navigate("/dashboard/admin/products");
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  //***********************************             DELETE PRODUCT            **********************************
  const handleDelete = async () => {
    try {
      let answer = window.prompt("Are you sure want to delete it ?");
      if (!answer) return;
      const { data } = await axios.delete(
        `/api/v1/product/delete-product/${id}`
      );

      if (data?.success) {
        toast.success(data?.message);
        navigate("/dashboard/admin/products");
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

  return (
    <Layout title={"Dashboard - Update Product"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9 p-3">
            <h1>Update Product</h1>
            <div className="m-1 w-75">
              <Select
                bordered={false}
                placeholder="Select a Category"
                size="medium"
                showSearch // search icon batava mate
                className="form-select"
                onChange={(value) => {
                  setCategory(value);
                }}
                // value={category.name} //                 category lakheli dekhay te mate value={} aapva padse aa rite ni to ni dakhay
                value={category} //  have category ni ID use kari etle ahi .name thi string aavse nahi, etle khali {category} lakhsu to display thase
              >
                {categories?.map((c) => (
                  <Option key={c._id} value={c._id}>
                    {c.name}
                  </Option>
                ))}
              </Select>

              <div className="m-3">
                <label className="btn btn-outline-secondary col-md-12">
                  {photo ? photo.name : "Upload Image"}
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={(e) => setPhoto(e.target.files[0])}
                    hidden //                                aa hidden karse to j only button dekhase nahi to , biju badhu pn dekhase
                  />
                </label>
              </div>

              {/* for image preview */}
              <div className="mb-3">
                {/* jo photo made to URL vali img batavisu */}
                {photo ? (
                  <div className="text-center mt-3">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="Product"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                ) : (
                  // nahi to je-te product ni id par thi img lesu
                  <div className="text-center mt-3">
                    <img
                      src={`/api/v1/product/product-photo/${id}`}
                      alt="Product"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                )}
              </div>

              {/*  */}
              <div className="m-3">
                <input
                  type="text"
                  placeholder="Enter name here"
                  className="form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="m-3">
                <textarea
                  name="text-area"
                  cols="108"
                  rows="4"
                  // placeholder="Write description here"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>
              <div className="m-3">
                <input
                  type="number"
                  placeholder="Write Price here"
                  className="form-control"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="m-3">
                <input
                  type="number"
                  placeholder="Write quantity here"
                  className="form-control"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              <div className="m-3">
                <Select
                  bordered={false}
                  placeholder="Select Shipping"
                  size="medium"
                  showSearch // search icon batava mate
                  className="form-select"
                  onChange={(value) => {
                    setShipping(value);
                  }}
                  value={shipping ? "Yes" : "No"} //                     etevi j rite ahi pn value aapi didhi to dekhay
                >
                  <Option value="0"> No</Option>
                  <Option value="1">Yes</Option>
                </Select>
              </div>
              <div className="m-3">
                <button className="btn btn-primary" onClick={handleUpdate}>
                  UPDATE PRODUCT
                </button>
              </div>
              <div className="m-3">
                <button className="btn btn-danger" onClick={handleDelete}>
                  DELETE PRODUCT
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateProduct;
