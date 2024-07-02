import express from "express";
import { updateUserPicture } from "../controllers/imagecontroller.js";

const router=express.Router();

router.put("/:username", updateUserPicture);

export default router;