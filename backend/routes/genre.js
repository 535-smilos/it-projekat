import express from "express";
import { addGenre, deleteByID, getByGenreID, getGenres, updateByID } from "../controllers/genrecontroller.js";

const router=express.Router();

//izlistaj sve zanrove
router.get("/", getGenres);

//uzima zanr po ID-ju zanra!!!
router.get("/:id", getByGenreID);

//dodaje zanr
router.post("/", addGenre);

//brise zanr, mada samo one koji nisu uvezani sa pjesmom!!!
router.delete("/:id", deleteByID);

//azurira ime postojeceg zanra po id-ju zanra!!!
router.put("/:id", updateByID);

export default router;