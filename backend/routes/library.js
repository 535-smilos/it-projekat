import express from "express";
import { LikeCount, getLikedByUser, getRateOfSong, likeSong, removeLike, updateRateOfSong } from "../controllers/librarycontroller.js";

const router=express.Router();

//uzmi pjesme korisnika koje se nalaze u library-ju, tj koje je on lajkovao
router.get("/:username", getLikedByUser);

//lajkuj pjesmu, tj za datog korisnika za neku pjesmu ubaci u pjesma_korisnik(library)
router.post("/:username/:song_id", likeSong);

//vrati broj lajkovanih pjesama za korisnika
router.get("/:username/count", LikeCount);

//azuriraj neku globalnu ocjenu za neku pjesmu, to je u atributu pjesme, ima vec gore u songs da se azuriraju citavi podaci
/*
router.put("/songs/ocjena/:song_id", (req, res) => {
    const { song_id } = req.params;
    const { ocjena } = req.body;

    const updateRatingQuery = 'UPDATE PJESMA SET ocjena = ? WHERE ID = ?';
    db.query(updateRatingQuery, [ocjena, song_id], (err, result) => {
        if (err) return res.json(err);
        return res.json("Globalna ocjena pjesme uspjesno azurirana!");
    });
});*/

//azuriraj ocjenu pjesme za korisnika u library-ju
router.put("/:username/:song_id", updateRateOfSong);

//dislajkuj pjesmu za korisnika, brise se objekat tabele pjesma_korisnik
router.delete("/:username/:song_id", removeLike);

//prikazi ocjenu za datu pjesmu od datog korisnika!!!
router.get("/:username/:song_id/ocjena", getRateOfSong);

export default router;