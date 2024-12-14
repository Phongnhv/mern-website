import express from "express";

import {
  fetchUser,
  fetchListing,
  createAdmin,
  getUserStatisticsByDate,
  getReports,
  getFeedBacks,
  deleteReport,
  deleteFeedBack,
  getListingStatisticsByDate,
  banUser,
  update
} from "../controllers/admin.controller.js";

const router = express.Router();

router.get("/users", fetchUser);
router.get("/listings", fetchListing);

router.post("/createAdmin", createAdmin);
router.get("/getUserStatisticsByDate", getUserStatisticsByDate);
router.get("/getListingStatisticsByDate",getListingStatisticsByDate)
router.get("/getReports", getReports);
router.get("/getFeedBacks", getFeedBacks);
router.delete("/deleteReport/:id",deleteReport)
router.delete("/deleteFeedBack/:id", deleteFeedBack);

router.post("/banUser/:id", banUser);
router.post("/update", update);
 
export default router;

