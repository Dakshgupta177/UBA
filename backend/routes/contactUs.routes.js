import { Contact, fetchAllCompletedContactDetails, fetchAllUncompletedContactDetails, updateContactStatus } from "../controllers/contactUs.controllers.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { adminOnly } from "../middleware/admin.middleware.js"
import Router from "express";

const router = Router();

router.post('/contact-us', Contact);
router.get('/admin/contact/uncompleted/:page',authMiddleware, adminOnly, fetchAllUncompletedContactDetails);
router.get('/admin/contact/completed/:page',authMiddleware, adminOnly, fetchAllCompletedContactDetails);
router.patch('/contactus/update',authMiddleware, adminOnly, updateContactStatus);

export default router;