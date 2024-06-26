import express from 'express';
import { deleteNews, getAllNews, postNews, updateNews } from '../controllers/newscontroller.js';

const router=express.Router();

router.get("/", getAllNews);
router.post("/", postNews);
router.put("/:id", updateNews);
router.delete("/:id", deleteNews);

export default router;