import {db} from "../server.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


export const register = async (req, res) => {
    const { username, password, slika, email, je_admin } = req.body;
    if (!username || !password || !email) {
        return res.status(400).json("Potrebni su svi podaci!");
    }

    // Check if user already exists
    const exists = "SELECT * FROM korisnik WHERE username = ? OR email = ?";
    db.query(exists, [username, email], async (err, data) => {
        if (err) return res.json(err);
        if (data.length > 0) return res.status(400).json("Korisnik vec postoji!");

        // Check if je_admin is requested and if an admin already exists
        if (je_admin && je_admin.toLowerCase() === "admin") {
            const checkAdmin = "SELECT * FROM korisnik WHERE je_admin = 1";
            db.query(checkAdmin, [], (err, data) => {
                if (err) return res.json(err);
                if (data.length > 0) return res.status(400).json("Vec postoji admin!");

                // Create new admin user
                createUser(username, password, slika, email, 1, res);
            });
        } else {
            // Create new regular user
            createUser(username, password, slika, email, 0, res);
        }
    });
};

const createUser = (username, password, slika, email, isAdmin, res) => {
    const salt = bcrypt.genSaltSync(10);
    const hashpass = bcrypt.hashSync(password, salt);

    const q = "INSERT INTO korisnik (username, password, slika, email, je_admin) VALUES (?, ?, ?, ?, ?)";
    db.query(q, [username, hashpass, slika, email, isAdmin], (err, data) => {
        if (err) return res.json(err);
        return res.json("Uspjesno kreiran korisnik!");
    });
};

export const login=(req, res)=>{
    const q="select * from korisnik where username=?";
    db.query(q, [req.body.username], (err, data)=>{
        if(err) return res.json(err);
        if(data.length===0) return res.status(404).json("Korisnik nije pronadjen!");

        //je li sifra dobra?
        const isPassTrue=bcrypt.compareSync(req.body.password, data[0].password);
        if(!isPassTrue) return res.status(400).json("Pogresna sifra ili username!");

        //tokenizacija!
        const token=jwt.sign({username:data[0].username, je_admin:data[0].je_admin}, "jwtkey");
        const {password, ...other}=data[0];

        res.status(200).json({other, token});
    });
};

export const logout=(req, res)=>{
    res.clearCookie("access_token",{
        sameSite:"none", secure:true
    }).status(200).json("Korisnik je izlogovan!");
};