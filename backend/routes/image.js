import express from "express";
import { sendImage } from "../controllers/imagecontroller.js";

const router=express.Router();

router.post("/", sendImage);

export default router;