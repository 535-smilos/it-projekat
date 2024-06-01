import {db} from "../server.js";

export const register=async (req, res) => {
    const { username, password, slika, email, je_admin } = req.body;
    if(!username||!password||!email){
        return res.status(404).json("Potrebni su svi podaci!");
    }

    const exists="SELECT * from korisnik where username=? or email=?";
    db.query(exists, [username, email], async (err, data)=>{
        if(err) return res.json(err);
        if(data.length>0) return res.status(400).json("Korisnik vec postoji!");
        const q = "insert into korisnik (username, password, slika, email, je_admin) values (?,?,?,?,?)";
        db.query(q, [username, password, slika, email, je_admin], (err, data) => {
            if (err) return res.json(err);
            return res.json("Uspjesno kreiran korisnik!");
        });
    });
};

export const login=(req, res)=>{
    const {username, password}=req.body;
    const q="select * from korisnik where username=? and password=?";
    db.query(q, [username, password], (err, data)=>{
        if(err) return res.json(err);
        if(data.length===0) return res.status(404).json("Korisnik nije pronadjen!");
        res.status(200).json({message:"Uspjesno logovan korisnik!"});
    });
};

export const logout=()=>{};