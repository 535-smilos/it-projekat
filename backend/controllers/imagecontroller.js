import {db} from "../server.js";


export const updateUserPicture=(req, res)=>{
    const {user}=req.params;
    const {slika}=req.body;
    console.log(slika);
    const q="update korisnik set slika=? where username=?";
    db.query(q, [slika, user], (err, data)=>{
        if(err) return res.json(err);
        console.log(res.data);
        return res.json("Azurirana slika!");
    });
}