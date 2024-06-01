import {db} from "../server.js";

export const getGenres=(req, res) => {
    const q = "select * from zanr";
    db.query(q, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
};

export const getByGenreID=(req, res) => {
    const q = "select * from zanr where id=?";
    const { id } = req.params;
    db.query(q, [id], (err, data) => {
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

export const deleteByID=(req, res) => {
    const q = "DELETE FROM zanr WHERE id = ?";
    const value = [req.params.id];
    db.query(q, value, (err, data) => {
        if (err) return res.json(err);
        if (data.affectedRows === 0) return res.status(404).json("zanr ne postoji!");
        return res.json("zanr uspjesno obrisan!");
    });
};

export const updateByID=(req, res) => {
    const { naziv } = req.body;
    const { id } = req.params;
    const q = "UPDATE ZANR SET naziv = ? WHERE ID = ?";
    db.query(q, [naziv, id], (err, data) => {
        if (err) return res.json(err);
        return res.json("zanr uspjesno azuriran!");
    });
};