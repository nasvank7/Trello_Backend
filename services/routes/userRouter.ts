import { Express } from "express";
import { Router } from "express";
import userController from "../controller/userController";
const router = Router();

router.post("/login", userController.PostLogin);
router.post("/register",userController.PostRegister)


export default router;
