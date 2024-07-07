import express from "express";
import { LikeCount, getLikedByUser, getRateOfSong, likeSong, removeLike, updateRateOfSong, getRestOfSongs } from "../controllers/librarycontroller.js";

const router=express.Router();

//uzmi pjesme korisnika koje se nalaze u library-ju, tj koje je on lajkovao
router.get("/:username", getLikedByUser);

router.get("/:username/exc", getRestOfSongs);

//lajkuj pjesmu, tj za datog korisnika za neku pjesmu ubaci u pjesma_korisnik(library)
router.post("/:username/:song_id", likeSong);

//vrati broj lajkovanih pjesama za korisnika
router.get("/:username/count", LikeCount);

//azuriraj ocjenu pjesme za korisnika u library-ju
router.put("/:username/:song_id", updateRateOfSong);

//dislajkuj pjesmu za korisnika, brise se objekat tabele pjesma_korisnik
router.delete("/:username/:song_id", removeLike);

//prikazi ocjenu za datu pjesmu od datog korisnika!!!
router.get("/:username/:song_id/ocjena", getRateOfSong);

export default router;