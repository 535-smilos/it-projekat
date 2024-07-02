import {db} from "../server.js";
import jwt from "jsonwebtoken";

export const getUsers=(req, res) => {

    const token = req.headers.authorization.split(" ")[1];
    try {
        const decoded = jwt.verify(token, "jwtkey");
        if (decoded.je_admin != 1) {
            return res.status(403).json({ message: "Zabranjen pristup" });
        }
    } catch (err) {
        return res.status(401).json({ message: "Neautorizovan pristup" });
    }

    const q = "SELECT * from korisnik";
    db.query(q, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
};

export const getUserByUsername=(req, res) => {
    const { username } = req.params;
    const q = "select * from korisnik where username=?";
    db.query(q, [username], (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
};

export const updateUserByUsername=(req, res) => {
    const { username } = req.params;
    const { password, slika, email, je_admin } = req.body;
    const q = "update korisnik set password=?, slika=?, email=?, je_admin=? where username=?";
    db.query(q, [password, slika, email, je_admin, username], (err, data) => {
        if (err) return res.json(err);
        return res.json("Uspjesno azuriran korisnik!");
    });
};

export const deleteUserByUsername=(req, res) => {
    const { username } = req.params;
    const q = "delete from korisnik where username=?";
    db.query(q, [username], (err, data) => {
        if (err) return res.json(err);
        return res.json("Uspjesno obrisan korisnik!");
    });
};

export const updateUserPicture=(req, res)=>{
    const {user}=req.params;
    const {slika}=req.body.slika;
    const q="update korisnik set slika=? where username=?";
    db.query(q, [slika, user], (err, data)=>{
        if(err) return res.json(err);
        return res.json("Azurirana slika!");
    });
}