import {db} from "../server.js";

export const getArtists=(req, res)=>{
    const q="select * from izvodjac";
    db.query(q, (err, data)=>{
        if(err) return res.json(err);
        return res.json(data);
    });
};

export const addArtist=(req, res)=>{
    const {ime}=req.body;
    const q="insert into izvodjac (ime) values (?)";
    db.query(q, [ime], (err, data)=>{
        if(err) return res.json(err);
        return res.json("Uspjesno kreiran korisnik!");
    });
};

export const updateByName=(req, res)=>{
    const {staro_ime, novo_ime}=req.body;
    const q="update izvodjac set ime=? where ime=?";
    db.query(q, [novo_ime, staro_ime], (err, data)=>{
        if(err) return res.json(err);
        if(data.affectedRows===0) return res.status(404).json("Izvodjac ne postoji!");
        return res.json("Uspjesno preimenovan korisnik!");
    });
};

export const deleteArtist=(req, res)=>{
    const {ime}=req.body;
    const q="DELETE from izvodjac where ime=?";
    db.query(q, [ime], (err, data)=>{
        if(err) return res.json(err);
        return res.json("Uspjesno obrisan izvodjac!");
    });
};