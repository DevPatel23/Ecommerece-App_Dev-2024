import slugify from "slugify";
import categoryModel from "../models/categoryModel.js";

/////////////                                           create category                                         ////////////
export const createCategoryController = async (req, res) => {
  try {
    const { name } = req.body;

    //validations
    if (!name) {
      return res.status(401).send({ message: "Name is required" });
    }

    //check existing
    const existingCategory = await categoryModel.findOne({ name });

    if (existingCategory) {
      return res.status(200).send({
        success: true,
        message: "Category already existed",
      });
    }

    // save
    const category = await new categoryModel({
      name,
      slug: slugify(name),
    }).save();

    res.status(201).send({
      success: true,
      message: "New Category Created successfully",
      category, //show category
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in creating Category",
      error,
    });
  }
};

/////////////                              update category                               ////////
export const updateCategoryController = async (req, res) => {
  try {
    const { name } = req.body; //update mate name, id banne joiye etle lidha
    const { id } = req.params;

    //update using id
    //aa category variable ma store karvanu
    const category = await categoryModel.findByIdAndUpdate(
      id,
      { name, slug: slugify(name) },
      { new: true }
    );

    res.status(201).send({
      success: true,
      message: "Category Updated Successfully",
      category, //                                                    aa category show karvanu
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in updating category",
      error,
    });
  }
};

/////////////                              GET ALL category                               ////////
export const categoryController = async (req, res) => {
  try {
    const category = await categoryModel.find({});

    res.status(201).send({
      success: true,
      message: "All categories List",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting all categories",
      error,
    });
  }
};

/////////////                              GET SINGLE category                               ////////
export const singleCategoryController = async (req, res) => {
  try {
    const { slug } = req.params;
    const category = await categoryModel.findOne({ slug: slug });

    res.status(201).send({
      success: true,
      message: "Get Single Category successfully",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting Single Category",
      error,
    });
  }
};

/////////////                              DELETE category                               ////////
export const deleteCategoryController = async (req, res) => {
  try {
    const { id } = req.params;
    await categoryModel.findByIdAndDelete(id);
    // have Category DELETE thai gyi te display nathi karvanu, etle Variable ma store ni kre to chale

    res.status(201).send({
      success: true,
      message: "Category Deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Deleting Category",
      error,
    });
  }
};
