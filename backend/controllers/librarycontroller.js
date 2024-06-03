import {db} from "../server.js";

export const getLikedByUser=(req, res) => {
    const { username } = req.params;
    const q = `
        SELECT PJESMA.*
        FROM PJESMA_KORISNIK
        INNER JOIN PJESMA ON PJESMA_KORISNIK.id_pjesma = PJESMA.ID
        WHERE PJESMA_KORISNIK.korisnik_username = ?
    `;
    db.query(q, [username], (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
};

export const likeSong=(req, res) => {
    const { username, song_id } = req.params;
    const { ocjena } = req.body; //opciono

    const checkUserQuery = "SELECT * FROM KORISNIK WHERE username = ?";
    db.query(checkUserQuery, [username], (err, userResult) => {
        if (err) return res.json(err);

        if (userResult.length === 0) return res.status(404).json("Korisnik ne postoji!");

        // Check if the song exists
        const checkSongQuery = "SELECT * FROM PJESMA WHERE ID = ?";
        db.query(checkSongQuery, [song_id], (err, songResult) => {
            if (err) return res.json(err);

            if (songResult.length === 0) return res.status(404).json("Pjesma ne postoji!");

            // Check if the user already liked the song
            const checkLikeQuery = "SELECT * FROM PJESMA_KORISNIK WHERE id_pjesma = ? AND korisnik_username = ?";
            db.query(checkLikeQuery, [song_id, username], (err, likeResult) => {
                if (err) return res.json(err);

                if (likeResult.length > 0) return res.status(400).json("Pjesma vec lajkovana!");

                // Like the song
                const q = "insert into pjesma_korisnik (id_pjesma, korisnik_username, ocjena) values (?,?,?)";
                db.query(q, [song_id, username, ocjena || null], (err, data) => {
                    if (err) return res.json(err);
                    return res.json("uspjesno lajkovana pjesma!");
                })
            });
        });
    });
};

export const LikeCount=(req, res) => {
    const { username } = req.params;
    const q = `
            select count(*) as LikedCnt
            from pjesma_korisnik
            where korisnik_username=?
    `;
    db.query(q, [username], (err, data) => {
        if (err) return res.json(err);
        if (data.length === 0) return res.status(404).json("Korisnik ne postoji!");
        return res.json(data[0]);
    });
};

export const updateRateOfSong=(req, res) => {
    const { username, song_id } = req.params;
    const { ocjena }=req.body;

    // Check if the user has liked the song
    const checkLikeQuery = "SELECT * FROM PJESMA_KORISNIK WHERE id_pjesma = ? AND korisnik_username = ?";
    db.query(checkLikeQuery, [song_id, username], (err, likeResults) => {
        if (err) return res.json(err);

        const likedSong = likeResults.length > 0;

        if (!likedSong) return res.status(400).json("User has not liked this song");

        // Update the rating for the song in the PJESMA_KORISNIK table
        const updateRatingQuery = 'UPDATE PJESMA_KORISNIK SET ocjena = ? WHERE id_pjesma = ? AND korisnik_username = ?';
        db.query(updateRatingQuery, [ocjena, song_id, username], (err, result) => {
            if (err) return res.json(err);
            return res.json("Ocjena pjesme za korisnika uspjesno azurirana!");
        });
    });
};

export const removeLike=(req, res) => {
    const { username, song_id } = req.params;

    const deleteLikeQuery = "DELETE FROM PJESMA_KORISNIK WHERE id_pjesma = ? AND korisnik_username = ?";
    db.query(deleteLikeQuery, [song_id, username], (err, result) => {
        if (err) return res.json(err);
        return res.json("Song disliked successfully");
    });
};

export const getRateOfSong=(req, res)=>{
    const {username, song_id}=req.params;
    const q="select ocjena from pjesma_korisnik where id_pjesma=? and korisnik_username=?";
    db.query(q, [song_id, username], (err, data)=>{
        if(err) return res.json(err);
        if(data.length===0) return res.status(404).json("Ne postoji ocjena za ovu pjesmu od korisnika!");
        return res.json(data[0]);
    });
};