import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import {
  brainTreePaymentController,
  brainTreeTokenController,
  createProductController,
  deleteProductController,
  getProductController,
  getSingleProductController,
  productCategoryController,
  productCountController,
  productFilterController,
  productListController,
  productPhotoController,
  relatedProductController,
  searchProductController,
  updateProductController,
} from "../controllers/productController.js";

import formidable from "express-formidable"; //     img na lidhe aa formidable package no use karyo chhe

//router object
const router = express.Router();

//////                 routing                 //////

//create product route
router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(), //                   have formidable no use karyo chhe etle ema thi aapne badhu GET karsu, pela body mathi GET karta pn have ni
  createProductController
);

//get all product
router.get("/get-product", getProductController);

//get single product
router.get("/get-product/:slug", getSingleProductController);

//get photo
router.get("/product-photo/:pid", productPhotoController);

//delete product
router.delete("/delete-product/:pid", deleteProductController);

//Update product route
router.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  formidable(),
  updateProductController
);

//filter product route
router.post("/product-filter", productFilterController);

//product count route
router.get("/product-count", productCountController);

//product per-page route
router.get("/product-list/:page", productListController);

//search product route
router.get("/search/:keyword", searchProductController);

//similar product route
router.get("/related-product/:pid/:cid", relatedProductController);

//category wise product route
router.get("/product-category/:slug", productCategoryController);

//payment gateway route
// for token
router.get("/braintree/token", brainTreeTokenController);

// for payment
router.post("/braintree/payment", requireSignIn, brainTreePaymentController);

export default router;
