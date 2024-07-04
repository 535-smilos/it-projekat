import express from "express";
import { addSong, deleteByID, getBySongID, getSongs, updateByID } from "../controllers/songcontroller.js";
const router=express.Router();

//izlistaj sve pjesme koje korisnik nije lajkovao
router.get("/", getSongs);

//kreiraj pjesmu
router.post("/", addSong);

//uzmi pjesmu po njenom ID-ju
router.get("/:id", getBySongID);

//azuriraj podatke pjesme koja se vadi po ID-ju pjesme!!!
router.put("/:id", updateByID);

//brisanje pjesme po ID-ju!!!
router.delete("/:id", deleteByID);

export default router;