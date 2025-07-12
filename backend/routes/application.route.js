import express from 'express';
import isAuthenticated from '../middlewares/isAuthenticate.js';
import { applyJob, getAppliedJobs } from '../controllers/application.controller.js';
const router = express.Router();
router.route("/apply/:id").post(isAuthenticated,applyJob);
router.route("/get").get(isAuthenticated,getAppliedJobs); 
router.route(":id/applicants").get(isAuthenticated,getAppliedJobs);

export default router;