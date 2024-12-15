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
router.get("/users/stats", getUserStatisticsByDate);
router.put("/users/:id/status", updateUserStatus);
router.delete("/users/:id/delete", deleteUser);
router.get("/listings", fetchListing);
router.get("/listings/stats", getListingStatisticsByDate);
router.put("/listings/:id/status", updateListingStatus);
router.delete("/listings/:id/delete", deleteListing);
router.get("/getFeedBacks", getFeedBacks);
//router.get('/updateUserAdmin', updateUserIsAdminfield)
//router.get('/updateUserBanned', updateUserIsBannedfield)
router.delete("/deleteFeedBack/:id", deleteFeedBack);
router.get("/getReports", getReports);
router.delete("/deleteReport/:id", deleteReport);

export default router;
