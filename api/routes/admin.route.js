import express from 'express'

import {fetchUser,
        fetchListing,
        updateUserIsAdminfield,
        updateUserIsBannedfield,
        updateListingStatusField} from '../controllers/admin.controller.js';
 
const router = express.Router();
 
router.get('/users', fetchUser);
router.get('/listings', fetchListing);
router.get('/updateUserAdmin', updateUserIsAdminfield)
router.get('/updateUserBanned', updateUserIsBannedfield)
router.get('/updateListingStatus', updateListingStatusField)
 
export default router;