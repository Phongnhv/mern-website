import Listing from "../models/listing.model.js";
import User from "../models/user.model.js";
import { errorHandler } from "../utils/errorHandler.js";

export const fetchListings = async (req, res, next) => {
  try {
    const listings = await Listing.find();
    res.status(200).json(listings);
  } catch (error) {
    next(error);
  }
};

export const fetchUser = async (req, res, next) => {
}