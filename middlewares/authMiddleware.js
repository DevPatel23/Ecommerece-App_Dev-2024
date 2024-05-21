import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";

// export const requireSignIn = async (req, res, next) => {
//   try {
//     const token = req.headers.authorization;
//     if (!token) {
//       return res.status(401).json({ error: "Unauthorized: No token provided" });
//     }

//     const decode = await JWT.verify(token, process.env.JWT_SECRET);
//     req.user = decode;
//     next();
//   } catch (error) {
//     console.log(error);
//     return res.status(401).json({ error: "Unauthorized: Invalid token" });
//   }
// };

//middlware-1  ==>  user na protected route mate
//       protected routes/user - token base          //
export const requireSignIn = async (req, res, next) => {
  try {
    // token ne compare krse, jo token brbr hase to middleware chalse.
    const decode = JWT.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    req.user = decode; //           aa lakhe to j --> encrypted chhe te decrypt thai ne, decode ni help thi, req.user ne madse..
    next();
  } catch (error) {
    console.log(error);
  }
};

//middlware-2  ==>  Admin na protected route mate
//////      admin access         //////

export const isAdmin = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id); ///       userModel mathi specific id na aadhare user ne find karse
    if (user.role !== 1) {
      ///    user role ne check karse --> jo 1 ni hoy to user admin nathi...
      return res.status(401).send({
        success: false,
        message: "UnAuthorized Access",
      });
    } else {
      next(); ////    next() lakhe to j further execution chalu rehse --> means jo user admin hase to access kari sakse em
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      message: "Error in admin middleware",
      error,
    });
  }
};
