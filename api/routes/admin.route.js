import express from "express";

import {
  fetchUser,
  fetchListing,
  getFeedBacks,
  deleteFeedBack,
  getReports,
  deleteReport,
  updateListingStatus,
  deleteUser, 
  deleteListing,
  getUserStatisticsByDate,
  getListingStatisticsByDate,
  banUser,
  createAdmin,
} from "../controllers/admin.controller.js";

const router = express.Router();

router.get("/users", fetchUser);
router.get("/users/stats", getUserStatisticsByDate);
router.put("/users/ban/:id", banUser);
router.delete("/users/delete/:id", deleteUser);
router.get("/listings", fetchListing);
router.get("/listings/stats", getListingStatisticsByDate);
router.put("/listings/status/:id", updateListingStatus);
router.delete("/listings/delete/:id", deleteListing);
router.get("/getFeedBacks", getFeedBacks);
router.post('/createAdmin', createAdmin)
router.delete("/deleteFeedBack/:id", deleteFeedBack);
router.get("/getReports", getReports);
router.delete("/deleteReport/:id", deleteReport);

export default router;
