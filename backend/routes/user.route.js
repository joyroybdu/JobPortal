import express from 'express';
import { login,logout, register, userUpdateProfile } from '../controllers/user.controller.js';
import isAuthenticated from '../middlewares/isAuthenticate.js';
const router=express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/profile/update").post(userUpdateProfile).put(isAuthenticated,userUpdateProfile);
<<<<<<< HEAD
export default router;
=======
export default router;
>>>>>>> 6a3bde86a56e3593402bb9e94164a38ac9f84a89
