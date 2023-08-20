import {Router} from "express";
const router = Router();

//Post Method
router.route("/register").post((req,res) => res.json("Register Route"));
router.route("/registerMail").post();
router.route("/authenticate").post();
router.route("/login").post();
//Get Method
router.route("/user/:username").get();
router.route("/genrateOTP").get();
router.route("/verifyOTP").get();
router.route("/resetCreateSession").get();

//Put Method
router.route("/updateuser").get();
router.route("/resetPassword").get();


export default router;