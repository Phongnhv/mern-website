import Listing from "../models/listing.model.js";
import User from "../models/user.model.js";
import { errorHandler } from "../utils/errorHandler.js";
 
export const fetchUser = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
 
    const skip = (page - 1) * limit;
 
    const users = await User.find({
      $or: [
        { isAdmin: false }, // Trường hợp isAdmin = false
        { isAdmin: { $exists: false } } // Trường hợp không có trường isAdmin
    ]
    })
      .skip(skip)
      .limit(limit)
      .select('-password');
   
    const totalUsers = await User.countDocuments({
      $or: [
        { isAdmin: false }, // Trường hợp isAdmin = false
        { isAdmin: { $exists: false } } // Trường hợp không có trường isAdmin
     ]
     });
 
    res.status(200).json({users, totalUsers});
  } catch (error) {
    errorHandler(error);
  }
};// code như get Listings giống trong listing.route.js nhưng thêm param page và skip đến số page đấy
//limit = 5
 
export const fetchListing = async (req, res, next) => {
  //code như trên nhưng cho user
  try {
    const limit = parseInt(req.query.limit) || 10;
    const page = parseInt(req.query.page) || 1;
    const startIndex = (page - 1) * limit;
    let offer = req.query.offer;
 
    if (offer === undefined || offer === "false") {
      offer = { $in: [false, true] };
    }
    let furnished = req.query.furnished;
    if (furnished === undefined || furnished === "false") {
      furnished = { $in: [false, true] };
    }
 
    let parking = req.query.parking;
    if (parking === undefined || parking === "false") {
      parking = { $in: [false, true] };
    }
 
    let type = req.query.type;
    if (type === undefined || type === "all") {
      type = { $in: ["sale", "rent"] };
    }
 
    const searchTerm = req.query.searchTerm || "";
    const sort = req.query.sort || "createAt";
    const order = req.query.order || "desc";
 
    const totalListing = await Listing.countDocuments({
      name: { $regex: searchTerm, $options: "i" },
      offer,
      furnished,
      parking,
      type,
    });
 
    const listings = await Listing.find({
      name: { $regex: searchTerm, $options: "i" },
      offer,
      furnished,
      parking,
      type,
    })
      .sort({ [sort]: order })
      .limit(limit)
      .skip(startIndex);
 
    return res.status(200).json({listings,totalListing});
  } catch (error) {
    next(error);
  }
}
 
export const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ message: "User deleted" });
  } catch (error) {
    next(error);
  }
}
 
export const constMoveToDeleteUser = async (req, res, next) => {
 
}
 
export const deleteListing = async (req, res, next) => {
  try {
    //add isDeleted to listing model and update later
    const listing = await Listing.findByIdAndDelete(req.params.id);
    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }
    return res.status(200).json({ message: "Listing deleted" });
  } catch (error) {
    next(error);
  }
}
 
export const banUser = async (req, res, next) => {
  //add isBanned to usermodel and update later
}
 