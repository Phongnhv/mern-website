import Listing from "../models/listing.model.js";
import User from "../models/user.model.js";
import { errorHandler } from "../utils/errorHandler.js";
 
export const fetchUser = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
 
    const skip = (page - 1) * limit;

    const searchTerm = req.query.searchTerm || "";
    const sort = req.query.sort || "createAt";
    const order = req.query.order || "desc";

    const users = await User.find(
        { username: { $regex: searchTerm, $options: "i" }, 
          isAdmin: false })
      .sort({ [sort]: order })
      .skip(skip)
      .limit(limit)
      .select('-password');
   
    const totalUsers = await User.countDocuments(
        { username: { $regex: searchTerm, $options: "i" },
          isAdmin: false }// Trường hợp isAdmin = false
        );
 
    res.status(200).json({users, totalUsers});
  } catch (error) {
    next(error);
  }
};// code như get Listings giống trong listing.route.js nhưng thêm param page và skip đến số page đấy
//limit = 5
 
export const fetchListing = async (req, res, next) => {
  //code như trên nhưng cho user
  try {
    const limit = parseInt(req.query.limit) || 5;
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
    const isDeleted = req.query.isDeleted || false;
 
    const totalListing = await Listing.countDocuments({
      name: { $regex: searchTerm, $options: "i" },
      offer,
      furnished,
      parking,
      type,
      isDeleted
    });
 
    const listings = await Listing.find({
      name: { $regex: searchTerm, $options: "i" },
      offer,
      furnished,
      parking,
      type,
      isDeleted
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
      return next(errorHandler(404, "User not found"));
    }
    return res.status(200).json("User deleted");
  } catch (error) {
    next(error);
  }
}
 
export const deleteListing = async (req, res, next) => {
  try {
    const listing = await Listing.findByIdAndUpdate(req.params.id, { isDeleted: true });
    //TODO add getListing if isDeleted = false
    if (!listing) {
      return next(errorHandler(404, "Listing not found"));
    }
    return res.status(200).json("Listing deleted");
  } catch (error) {
    next(error);
  }
}
 
export const permanentDeleteListing = async (req, res, next) => {
  try {
    //add isDeleted to listing model and update later
    const listing = await Listing.findByIdAndDelete(req.params.id);
    if (!listing) {
      return next(errorHandler(404, "Listing not found"));
    }
    return res.status(200).json("Listing deleted");
  } catch (error) {
    next(error);
  }
}
 
export const banUser = async (req, res, next) => {
  //add isBanned to usermodel and update later
  try {
    const user = await User.findByIdAndUpdate(req.params.id, { isBanned: true });
    if (!user) {
      return next(errorHandler(404, "User not found"));
    }
    return res.status(200).json("User banned");
  } catch (error) {
    next(error);
  }
}

export const updateUserIsAdminfield = async () => {
  try {
    const result = await User.updateMany(
      { isAdmin: { $exists: false } },
      { $set: { isAdmin: false } }
    );
    console.log(`${result.nModified} documents were updated.`);
  } catch (err) {
    console.error('Error updating documents:', err);
  }
}

export const updateListingIsDeletedfield = async () => {
  try {
    const result = await Listing.updateMany(
      { isDeleted: { $exists: false } },
      { $set: { isDeleted: false } }
    );
    console.log(`${result.nModified} documents were updated.`);
  } catch (err) {
    console.error('Error updating documents:', err);
  }
}

export const updateUserIsBannedfield = async () => {
  try {
    const result = await User.updateMany(
      { isBanned: { $exists: false } },
      { $set: { isBanned: false } }
    );
    console.log(`${result.nModified} documents were updated.`);
  } catch (err) {
    console.error('Error updating documents:', err);
  }
}