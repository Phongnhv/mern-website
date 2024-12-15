import express from "express";

import {
  fetchUser,
  fetchListing,
  getFeedBacks,
  deleteFeedBack,
  getReports,
  deleteReport,
  updateListingStatus,
  updateUserStatus,
  deleteUser,
  deleteListing,
  getUserStatisticsByDate,
  getListingStatisticsByDate,
} from "../controllers/admin.controller.js";

const router = express.Router();

router.get("/users", fetchUser);
router.get("/usersStats", getUserStatisticsByDate);
router.put("/usersStatus/:id", updateUserStatus);
router.delete("/deleteUser/:id", deleteUser);
router.get("/listings", fetchListing);
router.get("/listings/stats", getListingStatisticsByDate);
router.put("/listingsStatus/id", updateListingStatus);
router.delete("/deleteListing/:id", deleteListing);
router.get("/getFeedBacks", getFeedBacks);
//router.get('/updateUserAdmin', updateUserIsAdminfield)
//router.get('/updateUserBanned', updateUserIsBannedfield)
router.delete("/deleteFeedBack/:id", deleteFeedBack);
router.get("/getReports", getReports);
router.get("/deleteReport/:id", deleteReport);



export default router;
