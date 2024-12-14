import express from "express";

import {
  fetchUser,
  fetchListing,
  getFeedBacks,
  deleteFeedBack,
  getReports,
  deleteReport,
} from "../controllers/admin.controller.js";

const router = express.Router();

router.get("/users", fetchUser);
router.get("/listings", fetchListing);
router.get("/getFeedBacks", getFeedBacks);
//router.get('/updateUserAdmin', updateUserIsAdminfield)
//router.get('/updateUserBanned', updateUserIsBannedfield)
router.delete("/deleteFeedBack", deleteFeedBack);
router.delete("/deleteFeedBack/:id", deleteFeedBack);
router.get("/getReports", getReports);
router.get("/deleteReport", deleteReport);
router.get("/deleteReport/:id", deleteReport);

export default router;
