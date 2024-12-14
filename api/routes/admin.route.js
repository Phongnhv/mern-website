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
  //updateUserIsAdminfield,
  //updateUserIsBannedfield,
} from "../controllers/admin.controller.js";
 


const router = express.Router();

router.get("/users", fetchUser);
router.get("/listings", fetchListing);
//router.get('/updateUserAdmin', updateUserIsAdminfield)
//router.get('/updateUserBanned', updateUserIsBannedfield)
router.post("/createAdmin", createAdmin);
router.get("/getUserStatisticsByDate", getUserStatisticsByDate);
router.get("/getListingStatisticsByDate",getListingStatisticsByDate)
router.get("/getReports", getReports);
router.get("/getFeedBacks", getFeedBacks);
router.delete("/deleteReport/:id",deleteReport)
router.delete("/deleteFeedBack/:id", deleteFeedBack);
export default router;