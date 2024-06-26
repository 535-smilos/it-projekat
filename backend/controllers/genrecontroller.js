import {db} from "../server.js";

export const getGenres=(req, res) => {
    const q = "select * from zanr";
    db.query(q, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
};

export const getByGenreName=(req, res) => {
    const q = "select * from zanr where naziv=?";
    const { name } = req.body.naziv;
    db.query(q, [name], (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
};

export const addGenre=(req, res) => {
    const q = "insert into zanr (`naziv`) VALUES (?)";
    const value = [req.body.naziv];
    db.query(q, value, (err, data) => {
        if (err) return res.json(err);
        return res.json("uspjesno dodat zanr!");
    });
};

export const deleteByGenreName=(req, res) => {
    const q = "DELETE FROM zanr WHERE naziv = ?";
    const value = [req.body.naziv];
    db.query(q, value, (err, data) => {
        if (err) return res.json(err);
        if (data.affectedRows === 0) return res.status(404).json("zanr ne postoji!");
        return res.json("zanr uspjesno obrisan!");
    });
};

export const updateByGenreName=(req, res) => {
    const { stari_naziv, novi_naziv } = req.body;
    const q = "UPDATE ZANR SET naziv = ? WHERE naziv = ?";
    db.query(q, [novi_naziv, stari_naziv], (err, data) => {
        if (err) return res.json(err);
        return res.json("zanr uspjesno azuriran!");
    });
};