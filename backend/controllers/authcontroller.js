import {db} from "../server.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


export const register=async (req, res) => {
    const { username, password, slika, email, je_admin } = req.body;
    if(!username||!password||!email){
        return res.status(404).json("Potrebni su svi podaci!");
    }

    const exists="SELECT * from korisnik where username=? or email=?";
    db.query(exists, [username, email], async (err, data)=>{
        if(err) return res.json(err);
        if(data.length>0) return res.status(400).json("Korisnik vec postoji!");

        const salt=bcrypt.genSaltSync(10);
        const hashpass=bcrypt.hashSync(password, salt);

        const q = "insert into korisnik (username, password, slika, email, je_admin) values (?,?,?,?,?)";
        db.query(q, [username, hashpass, slika, email, je_admin], (err, data) => {
            if (err) return res.json(err);
            return res.json("Uspjesno kreiran korisnik!");
        });
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
        const token=jwt.sign({username:data[0].username}, "jwtkey");
        const {password, ...other}=data[0];

        res.status(200).json({other, token});
    });
};

export const logout=(req, res)=>{
    res.clearCookie("access_token",{
        sameSite:"none", secure:true
    }).status(200).json("Korisnik je izlogovan!");
};