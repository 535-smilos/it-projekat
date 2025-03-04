import {db} from "../server.js";

export const getSongs=(req, res) => {
    // const q = `select pjesma.ID, i.ime_izvodjac, pjesma.naziv, pjesma.url, pjesma.trajanje, pjesma.ocjena , z.naziv as zanr_naziv from pjesma
    // inner join pjesma_izvodjac i on i.id_pjesma=pjesma.ID
    // inner join zanr z on z.naziv=pjesma.naziv_zanra
    // `;
    const q=`select * from pjesma`;
    db.query(q, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
};

export const addSong=(req, res)=>{
    const { naziv, url, ocjena, trajanje, naziv_zanra } = req.body;
    const q = "INSERT INTO PJESMA (naziv, url, ocjena, trajanje, naziv_zanra) VALUES (?, ?, ?, ?, ?)";
    db.query(q, [naziv, url, ocjena, trajanje, naziv_zanra], (err, data) => {
        if (err) return res.json(err);
        return res.json("Pjesma dodata!");
    });
};

export const getBySongID=(req, res)=>{
    const { id } = req.params;
    const q = "SELECT * FROM PJESMA WHERE ID=?";
    db.query(q, [id], (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
};

export const updateByID=(req, res) => {
    const { id } = req.params;
    const { naziv, url, ocjena, trajanje, naziv_zanra } = req.body;
    const q = "UPDATE PJESMA SET naziv = ?, url = ?, ocjena = ?, trajanje = ?, naziv_zanra = ? WHERE ID = ?";
    db.query(q, [naziv, url, ocjena, trajanje, naziv_zanra, id], (err, data) => {
        if (err) return res.json(err);
        return res.json("Pjesma azurirana!");
    });
};

export const deleteByID=(req, res) => {
    const { id } = req.params;
    const q = "DELETE from pjesma where ID=?";
    db.query(q, [id], (err, data) => {
        if (err) return res.json(err);
        return res.json("Pjesma obrisana!");
    });
};