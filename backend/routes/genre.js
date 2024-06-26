import express from "express";
import { addGenre, deleteByGenreName, getByGenreName, getGenres, updateByGenreName,} from "../controllers/genrecontroller.js";

const router=express.Router();

//izlistaj sve zanrove
router.get("/", getGenres);

//uzima zanr po ID-ju zanra!!!
router.get("/specific", getByGenreName);

//dodaje zanr
router.post("/", addGenre);

//brise zanr, mada samo one koji nisu uvezani sa pjesmom!!!
router.delete("/:id", deleteByGenreName);

//azurira ime postojeceg zanra po id-ju zanra!!!
router.put("/:id", updateByGenreName);

export default router;