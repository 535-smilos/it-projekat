import {db} from "../server.js";

export const getArtists=(req, res)=>{
    const q="select * from izvodjac";
    db.query(q, (err, data)=>{
        if(err) return res.json(err);
        return res.json(data);
    });
};

export const getArtistsNameBySong=(req, res)=>{
    const songId=req.params;
    const q=`SELECT IZVODJAC.ime FROM IZVODJAC
    INNER JOIN PJESMA_IZVODJAC ON IZVODJAC.ime = PJESMA_IZVODJAC.ime_izvodjac
    WHERE PJESMA_IZVODJAC.id_pjesma = ?`;
    db.query(q, [songId], (err, results) => {
        if (err) {
          return res.status(500).json({ error: 'Internal Server Error' });
        }
        if (results.length === 0) {
          return res.status(404).json({ message: 'No artist found for this song' });
        }
        res.json(results[0]);
    });
}

export const addArtist=(req, res)=>{
    const {ime}=req.body;
    const q="insert into izvodjac (ime) values (?)";
    db.query(q, [ime], (err, data)=>{
        if(err) return res.json(err);
        return res.json("Uspjesno kreiran izvodjac!");
    });
};

export const updateByName=(req, res)=>{
    const {ime}=req.params;
    const {novo_ime}=req.body;
    console.log(ime, novo_ime)
    const q="update izvodjac set ime=? where ime=?";
    db.query(q, [novo_ime, ime], (err, data)=>{
        if(err) return res.json(err);
        if(data.affectedRows===0) return res.status(404).json("Izvodjac ne postoji!");
        return res.json("Uspjesno preimenovan izvodjac!");
    });
};

export const deleteArtist=(req, res)=>{
    const {ime}=req.params;
    const q="DELETE from izvodjac where ime=?";
    db.query(q, [ime], (err, data)=>{
        if(err) return res.json(err);
        return res.json("Uspjesno obrisan izvodjac!");
    });
};