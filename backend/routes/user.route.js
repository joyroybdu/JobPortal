import express from 'express';
import { login,logout, register, userUpdateProfile } from '../controllers/user.controller.js';
import isAuthenticated from '../middlewares/isAuthenticate.js';
const router=express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/profile/update").post(userUpdateProfile).put(isAuthenticated,userUpdateProfile);
export default router;
