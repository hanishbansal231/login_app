import {Router} from "express";
const router = Router();
import * as controller from '../controllers/appController.js';

//Post Method
router.route("/register").post(controller.register); // register user
// // router.route("/registerMail").post(); // send the email
// router.route("/authenticate").post((req,res) => res.end()); // authenticare user
router.route("/login").post(controller.verifyUser,controller.login); // login in app
// //Get Method
router.route("/user/:username").get(controller.getUser); // user with username
// router.route("/genrateOTP").get(controller.genrateOTP); // send otp
// router.route("/verifyOTP").get(controller.verifyOTP); // verify otp
// router.route("/resetCreateSession").get(controller.resetCreateSession); // reset all the variable

// //Put Method
// router.route("/updateuser").get(controller.updateUser); // update user profile
// router.route("/resetPassword").get(controller.resetPassword); // use to reset password


export default router;