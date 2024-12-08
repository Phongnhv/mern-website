import express from 'express'
import {fetchUser,fetchListing } from '../controllers/admin.controller.js';
 
const router = express.Router();
 
router.get('/users', fetchUser);
router.get('/listings', fetchListing);
 
export default router;