//***********            CATEGORY CREATE karva mate nu FORM chhe */

import React from "react";

// {} aa je lakhyu chhe tene USE karvanu, jya pn aa form use karu tyre
const CategoryForm = ({ handleSubmit, value, setValue }) => {
  //props ni rite lakhya
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Enter New Category"
            value={value} //                      aa lakhyu jena lidhe hu game tya aa form ne use karis, aa {valie} ma changes kari ne
            onChange={(e) => setValue(e.target.value)} // same ahi pn
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Create
        </button>
      </form>
    </>
  );
};

export default CategoryForm;
