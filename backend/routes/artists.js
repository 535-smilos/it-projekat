import express from "express";
import { addArtist, deleteArtist, getArtists, updateByName } from "../controllers/artistcontroller.js";

const router=express.Router();

//uzmi sve izvodjace
router.get("/", getArtists);

//dodaj izvodjaca
router.post("/", addArtist);

//azuriraj ime izvodjaca po njegovom imenu, ovo mora sve preko body-ja(nece url da primi razmak)!!!
router.put("/", updateByName);

//izbrisi izvodjaca, ponovo se navodi u body ime jer url i razmak
router.delete("/", deleteArtist);

export default router;