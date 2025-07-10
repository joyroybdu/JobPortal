import express from 'express';
import isAuthenticated from '../middlewares/isAuthenticate.js';
import { applyJob, getAppliedJobs } from '../controllers/application.controller.js';
router = express.Router();
router.route("/apply/:id").get(isAuthenticated,applyJob);
router.route("/get").get(isAuthenticated,getAppliedJobs); 
router.route(":id/applicants").get(isAuthenticated,getAppliedJobs);
router

export default router;