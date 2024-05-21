//******         Admin ma left side je Create Categpry Menu banavyo chhe te page chhe          ********* */

import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import { toast } from "react-toastify";
import axios from "axios";

import CategoryForm from "../Forms/CategoryForm";
import { Modal } from "antd";

const CreateCategory = () => {
  const [categories, setCategories] = useState([]); //               GET mate ni state
  const [name, setName] = useState(""); //                        CREATE-Form mate ni state, jenu logic CREATE-form ma chhe te
  const [visible, setVisible] = useState(false); //                  popup modal dekhay k ni tena mate

  //categoryForm ni under props chhe ena mate aa state
  const [selected, setSelected] = useState(null); // EDIT/update mate ni biji state, aa state e category ni ID select karva mate kari jena thi update krse
  const [updatedName, setUpdatedName] = useState(""); // same CREATE-form ma UPDATE mate ni aa state use karsu

  //
  //
  //***************************             CREATE Categories    ************************************
  // form ne SUBMIT karva mate nu function
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post("/api/v1/category/create-category", {
        name, //                                           aani help thi display thase
      });
      if (data?.success) {
        toast.success(`${name} is created`);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in Input Form");
    }
  };

  //
  //***************************             GETTING all categories    ************************************
  const getAllCategory = async () => {
    try {
      // GET ni API hit karavana
      const { data } = await axios.get("/api/v1/category/get-category");

      //jo aa GET data madyo to..
      if (data?.success) {
        setCategories(data?.category); //             aa "category" e BACKEND mathi aave chhe, to spelling brbr lakhvani
        toast.success("Category List");
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

  //***************************             UPDATE Categories    ************************************
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `/api/v1/category/update-category/${selected._id}`,
        // selected id thi je-te category select thase ane updatedName thi me je name change karyu chhe te mane Updated dekhase
        { name: updatedName }
      );
      if (data.success) {
        // etle popup form submit successfully
        toast.success(`${updatedName} is Updated`);
        setSelected(null);
        setUpdatedName("");
        setVisible(false);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  //
  //***************************             DELETE Categories    ************************************
  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(
        `/api/v1/category/delete-category/${id}`
      );
      if (data.success) {
        toast.success("Category is Deleted");
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title={"Dashboard - Create Category"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9 p-3">
            <h1>Manage Category</h1>
            <div className="p-3 w-50">
              <CategoryForm
                // biji file ma lakhela FORM mathi value leva mate niche nu lakhyu chhe
                handleSubmit={handleSubmit} //                handle karva function pn banavyu chhe, tya CREATE-Api hit karavi chhe
                value={name} //                               handle karva mate uper STATE banavi chhe
                setValue={setName}
              />
            </div>

            <div className="w-75">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {categories?.map((c) => (
                    <>
                      <tr>
                        <td key={c._id}> {c.name} </td>
                        <td>
                          <button
                            className="btn btn-primary ms-2"
                            onClick={() => {
                              setVisible(true); //              MODAL ma data display karva mate je state use kari tene lakhi chhe
                              setUpdatedName(c.name); //        update state
                              setSelected(c); //                update state
                            }}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-danger ms-2"
                            onClick={() => {
                              handleDelete(c._id);
                            }}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    </>
                  ))}
                </tbody>
              </table>
            </div>
            <Modal
              onCancel={() => setVisible(false)}
              footer={null}
              open={visible}
            >
              {/* update mate pn same CREATE-valu form j use krye, bas khali PROPS diff rehse */}
              <CategoryForm
                value={updatedName} //                 update state
                setValue={setUpdatedName} //           update state
                handleSubmit={handleUpdate} //         aa category ne UPDATE mate nu function, tya Update-API hit karavis
              />
            </Modal>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
