import { db } from "../server.js";

export const getLikedByUser = (req, res) => {
  const { username } = req.params;
  const {search, filter, sort}=req.query;

  let baseQuery = `
    SELECT PJESMA.ID, PJESMA.naziv, PJESMA.url, PJESMA.trajanje, PJESMA.naziv_zanra, PJESMA_KORISNIK.ocjena, IZVODJAC.ime AS artist
    FROM PJESMA
    INNER JOIN PJESMA_KORISNIK ON PJESMA.ID = PJESMA_KORISNIK.id_pjesma
    INNER JOIN PJESMA_IZVODJAC ON PJESMA.ID = PJESMA_IZVODJAC.id_pjesma
    INNER JOIN IZVODJAC ON PJESMA_IZVODJAC.ime_izvodjac = IZVODJAC.ime
    INNER JOIN ZANR ON PJESMA.naziv_zanra = ZANR.naziv
    WHERE PJESMA_KORISNIK.korisnik_username = ?
    `;
    const queryParams=[username];

    if(search){
      baseQuery+=` AND (PJESMA.naziv LIKE ? OR IZVODJAC.ime LIKE ? OR PJESMA.naziv_zanra LIKE ?)`;
      const searchQuery=`%${search}%`;
      queryParams.push(searchQuery, searchQuery, searchQuery);
    }

    if (filter !== '-') {
      let column;
      switch (filter) {
        case 'Genre':
          column = 'PJESMA.naziv_zanra';
          break;
        case 'Artist':
          column = 'artist';
          break;
        case 'Title':
          column = 'PJESMA.naziv';
          break;
        case 'Duration':
          column = 'PJESMA.trajanje';
          break;
        case 'Rating':
          column = 'PJESMA_KORISNIK.ocjena';
          break;
        default:
          column = null;
          break;
      }
      if (column) {
        baseQuery += ` ORDER BY ${column} ${sort === 'asc' ? 'ASC' : 'DESC'}`;
      }
    }

 
    db.query(baseQuery, queryParams, (err, data) => {
      if (err) return res.json(err);
      return res.json(data);
    });
};

export const getRestOfSongs = (req, res) => {
  const { filter, sort, search } = req.query;
  const username = req.params.username;

  let baseQuery = `
    SELECT p.ID, i.ime_izvodjac, p.naziv AS naziv_pjesma, p.url, p.trajanje, p.ocjena, z.naziv AS zanr_naziv
    FROM pjesma p
    INNER JOIN pjesma_izvodjac i ON i.id_pjesma = p.ID
    INNER JOIN zanr z ON z.naziv = p.naziv_zanra
    WHERE p.ID NOT IN (
        SELECT id_pjesma
        FROM pjesma_korisnik
        WHERE korisnik_username = ?
    )`;

  let queryParams = [username];

  if (search) {
    baseQuery += ` AND (i.ime_izvodjac LIKE ? OR p.naziv LIKE ? OR z.naziv LIKE ?)`;
    const searchQuery = `%${search}%`;
    queryParams.push(searchQuery, searchQuery, searchQuery);
  }

  if (filter !== '-') {
    let column;
    switch (filter) {
      case 'Genre':
        column = 'z.naziv';
        break;
      case 'Artist':
        column = 'i.ime_izvodjac';
        break;
      case 'Title':
        column = 'p.naziv';
        break;
      case 'Duration':
        column = 'p.trajanje';
        break;
      case 'Rating':
        column = 'p.ocjena';
        break;
      default:
        column = null;
        break;
    }
    if (column) {
      baseQuery += ` ORDER BY ${column} ${sort === 'asc' ? 'ASC' : 'DESC'}`;
    }
  }

  db.query(baseQuery, queryParams, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
};

export const likeSong = (req, res) => {
  const { username, song_id } = req.params;
  const { ocjena } = req.body; //opciono
  const checkUserQuery = "SELECT * FROM KORISNIK WHERE username = ?";
  db.query(checkUserQuery, [username], (err, userResult) => {
    if (err) return res.json(err);

    if (userResult.length === 0)
      return res.status(404).json("Korisnik ne postoji!");

    // Check if the song exists
    const checkSongQuery = `SELECT * FROM  pjesma p WHERE  p.ID = ? AND
p.ID NOT IN (
        SELECT id_pjesma
        FROM pjesma_korisnik
        WHERE korisnik_username = ?
    );`;
    db.query(checkSongQuery, [song_id, username], (err, songResult) => {
      if (err) return res.json(err);

      if (songResult.length === 0)
        return res.status(404).json("Pjesma ne postoji!");

      // Check if the user already liked the song
      const checkLikeQuery =
        "SELECT * FROM PJESMA_KORISNIK WHERE id_pjesma = ? AND korisnik_username = ?";
      db.query(checkLikeQuery, [song_id, username], (err, likeResult) => {
        if (err) return res.json(err);

        if (likeResult.length > 0)
          return res.status(400).json("Pjesma vec lajkovana!");

        // Like the song

        const q =
          "insert into pjesma_korisnik (id_pjesma, korisnik_username, ocjena) values (?,?,?)";
        db.query(q, [song_id, username, ocjena || null], (err, data) => {
          if (err) return res.json(err);
          return res.json("uspjesno lajkovana pjesma!");
        });
      });
    });
  });
};

export const LikeCount = (req, res) => {
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

export const updateRateOfSong = (req, res) => {
  const { username, song_id } = req.params;
  const { ocjena } = req.body;

  // Check if the user has liked the song
  const checkLikeQuery =
    "SELECT * FROM PJESMA_KORISNIK WHERE id_pjesma = ? AND korisnik_username = ?";
  db.query(checkLikeQuery, [song_id, username], (err, likeResults) => {
    if (err) return res.json(err);

    const likedSong = likeResults.length > 0;

    if (!likedSong) return res.status(400).json("User has not liked this song");

    // Update the rating for the song in the PJESMA_KORISNIK table
    const updateRatingQuery =
      "UPDATE PJESMA_KORISNIK SET ocjena = ? WHERE id_pjesma = ? AND korisnik_username = ?";
    db.query(updateRatingQuery, [ocjena, song_id, username], (err, result) => {
      if (err) return res.json(err);
      return res.json("Ocjena pjesme za korisnika uspjesno azurirana!");
    });
  });
};

export const removeLike = (req, res) => {
  const { username, song_id } = req.params;

  const deleteLikeQuery =
    "DELETE FROM PJESMA_KORISNIK WHERE id_pjesma = ? AND korisnik_username = ?";
  db.query(deleteLikeQuery, [song_id, username], (err, result) => {
    if (err) return res.json(err);
    return res.json("Song disliked successfully");
  });
};

export const getRateOfSong = (req, res) => {
  const { username, song_id } = req.params;
  const q =
    "select ocjena from pjesma_korisnik where id_pjesma=? and korisnik_username=?";
  db.query(q, [song_id, username], (err, data) => {
    if (err) return res.json(err);
    if (data.length === 0)
      return res
        .status(404)
        .json("Ne postoji ocjena za ovu pjesmu od korisnika!");
    return res.json(data[0]);
  });
};
