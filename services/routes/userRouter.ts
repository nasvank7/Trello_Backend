import { Express } from "express";
import { Router } from "express";
import userController from "../controller/userController";
const router = Router();

router.post("/login", userController.PostLogin);

export default router;
