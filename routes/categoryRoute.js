import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import {
  categoryController,
  createCategoryController,
  deleteCategoryController,
  singleCategoryController,
  updateCategoryController,
} from "../controllers/categoryController.js";

//

//router object
const router = express.Router();

//                      routing process                     //

//create category route
router.post(
  "/create-category",
  requireSignIn,
  isAdmin,
  createCategoryController
);

//update category route
router.put(
  "/update-category/:id", //             id thi UPDATE karsu
  requireSignIn,
  isAdmin,
  updateCategoryController
);

//GET ALL category route
router.get("/get-category", categoryController);

//GET SINGLE category route
router.get("/single-category/:slug", singleCategoryController); //       slug thi GET karsu

//DELETE category route
router.delete(
  "/delete-category/:id", //              id thi delete karsu
  requireSignIn,
  isAdmin,
  deleteCategoryController
);

export default router;
