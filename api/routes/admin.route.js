import express from 'express'
import {fetchUser,
        fetchListing,
        updateUserIsAdminfield,
        updateUserIsBannedfield} from '../controllers/admin.controller.js';
 
const router = express.Router();
 
router.get('/users', fetchUser);
router.get('/listings', fetchListing);
router.get('/updateUserAdmin', updateUserIsAdminfield)
router.get('/updateUserBanned', updateUserIsBannedfield)
 
export default router;