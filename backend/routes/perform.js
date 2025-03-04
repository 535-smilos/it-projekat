import express from "express";
import { addArtistSong, deleteArtistSong, getAllSongsAndArtists, getArtistSong, editArtistSong } from "../controllers/performcontroller.js";

const router=express.Router();

//NAPOMENA: sve parametre stavljamo u body zahtjeva!
//vrati sve izvodjace sa njihovim pjesmama
router.get("/", getAllSongsAndArtists);

//vrati izvodjaceve pjesme tako da vrati citav objekat pjesme!
router.get("/songs", getArtistSong);

//uveži izvodjaca sa pjesmom
router.post("/", addArtistSong);

//azuriraj izvodjaca i pjesmu
router.put("/", editArtistSong);

//izbrisati vezu pjesme i izvodjaca
router.delete("/", deleteArtistSong);

export default router;