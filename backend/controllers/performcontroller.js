import {db} from "../server.js";

export const getAllSongsAndArtists=(req, res)=>{
    const q="select * from pjesma_izvodjac";
    db.query(q, (err, data)=>{
        if(err) return res.json(err);
        return res.json(data);
    });
};

export const getArtistSong=(req, res)=>{
    const {izvodjac}=req.body;
    const q="SELECT ID,naziv,url,ocjena,trajanje,zanr_id from pjesma p INNER JOIN pjesma_izvodjac pi ON pi.id_pjesma=p.ID WHERE pi.ime_izvodjac=?";
    db.query(q, [izvodjac], (err, data)=>{
        if(err) return res.json(err);
        return res.json(data);
    });
};

export const addArtistSong=(req, res)=>{
    const {song_id, izvodjac}=req.body;
    const q="INSERT into pjesma_izvodjac (id_pjesma, ime_izvodjac) values (?,?)";
    db.query(q, [song_id, izvodjac], (err, data)=>{
        if(err) return res.json(err);
        return res.json("Uspjesno uvezani izvodjac i pjesma!");
    });
};

export const deleteArtistSong=(req, res)=>{
    const {song_id, izvodjac}=req.params;
    const q="DELETE from pjesma_izvodjac where id_pjesma=? and ime_izvodjac=?";
    db.query(q, [song_id, izvodjac], (err, data)=>{
        if(err) return res.json(err);
        return res.json("Uspjesno izbrisana veza pjesme i izvodjaca!");
    });
};

export const editArtistSong=(req, res)=>{
    const {song_id, ime_izvodjac, novi_song_id, novi_izvodjac}=req.body;
    const q=`UPDATE pjesma_izvodjac SET id_pjesma=?, ime_izvodjac=? WHERE
            id_pjesma=? AND ime_izvodjac=?`;
    db.query(q, [novi_song_id, novi_izvodjac, song_id, ime_izvodjac], (err, data)=>{
        if(err) return res.json(err);
        return res.json("Uspjesno azurirana veza izvodjaca i pjesme!");
    });
}