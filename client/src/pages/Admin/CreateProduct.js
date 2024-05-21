//***   Admin ma je left ma che te   *** */

import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import axios from "axios";

import { Select } from "antd";
const { Option } = Select;

const CreateProduct = () => {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [photo, setPhoto] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");

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
  useEffect(() => {
    getAllCategory();
  }, []);

  //
  //*****************************                   CREATE PRODUCT Function               ********************************//
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData(); //          FormData banavyo --> productData name no
      productData.append("name", name); //            have aa productData ma badhi field APPEND karai desu
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("shipping", shipping);
      productData.append("category", category);
      productData.append("photo", photo);

      const { data } = await axios.post(
        "/api/v1/product/create-product",
        productData
        //                            productData ni help thi data lakhisu,
        //                            ane sathe PHOTO pn chhe to etle ene leva mate formData property use karva pade
        //                            jo direct data lakhu to photo ni aave, photo na lidhe aa use karyu
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

  return (
    <Layout title={"Dashboard - Create Product"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9 p-3">
            <h1>Create Product</h1>
            <div className="m-1 w-75">
              <Select
                bordered={false}
                placeholder="Select a Category"
                size="medium"
                showSearch // search icon batava mate
                className="form-select"
                //dropdown menu ma Category lakhay te mate niche n lakhyu
                // AntD design ni onchange chhe etle breacket ma value lakhi sakay, ni to bije badhe e use karyo chhe ne
                onChange={(value) => {
                  setCategory(value);
                }}
              >
                {/* dropdown menu ma options batave badhi vategory na te mate categories ne map karya */}
                {categories?.map((c) => (
                  // value = id rakhva pade ni to mongoDB ma nai batave
                  <Option key={c._id} value={c._id}>
                    {c.name}
                  </Option>
                ))}
              </Select>

              {/*                            selecting file from browse                 */}
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

              {/*                    for image preview                    */}
              <div className="mb-3">
                {photo && (
                  <div className="text-center mt-3">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="Product"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                )}
              </div>

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
                  placeholder="Write description here"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>
              <div className="m-3">
                <input
                  type="number"
                  placeholder="Enter Price here"
                  className="form-control"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="m-3">
                <input
                  type="number"
                  placeholder="Enter quantity here"
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
                >
                  <Option value="0"> No</Option>
                  <Option value="1">Yes</Option>
                </Select>
              </div>
              <div className="m-3">
                <button className="btn btn-primary" onClick={handleCreate}>
                  CREATE PRODUCT
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateProduct;
