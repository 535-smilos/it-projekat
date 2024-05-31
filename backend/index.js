import express from "express";
import mysql from "mysql";

const app=express();

const db=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"535170milos",
    database:"soundsphere"
});

app.use(express.json());

app.get("/", (req, res)=>{
    res.json("HEllo this is bekend!");
});

//--------------------ZANR
//uzima sve zanrove
app.get("/genres", (req, res)=>{
    const q="select * from zanr";
    db.query(q, (err, data)=>{
        if(err) return res.json(err);
        return res.json(data);
    });
});

//uzima zanr po ID-ju zanra!!!
app.get("/genres/:id", (req, res)=>{
    const q="select * from zanr where id=?";
    const {id}=req.params;
    db.query(q, [id],(err, data)=>{
        if(err) return res.json(err);
        return res.json(data);
    });
});

//dodaje zanr
app.post("/genres", (req, res)=>{
    const q="insert into zanr (`naziv`) VALUES (?)";
    const value=[req.body.naziv];
    db.query(q, value, (err, data)=>{
        if(err) return res.json(err);
        return res.json("uspjesno dodat zanr!");
    });
});

//brise zanr, mada samo one koji nisu uvezani sa pjesmom!!!
app.delete("/genres/:id", (req, res) => {
    const q = "DELETE FROM zanr WHERE id = ?";
    const value = [req.params.id];
    db.query(q, value, (err, data) => {
        if (err) return res.json(err);
        if (data.affectedRows === 0) return res.status(404).json("zanr ne postoji!");
        return res.json("zanr uspjesno obrisan!");
    });
});

//azurira ime postojeceg zanra po id-ju zanra!!!
app.put("/genres/:id", (req, res) => {
    const { naziv } = req.body;
    const { id } = req.params;
    const q = "UPDATE ZANR SET naziv = ? WHERE ID = ?";
    db.query(q, [naziv, id], (err, data) => {
        if (err) return res.json(err);
        return res.json("Genre successfully updated");
    });
});

//--------------------PJESMA
//uzmi sve pjesme!!!
app.get("/songs", (req, res)=>{
    const q="select * from pjesma";
    db.query(q, (err, data)=>{
        if(err) return res.json(err);
        return res.json(data);
    });
});

//kreiraj pjesmu
app.post("/songs", (req, res)=>{
    const { naziv, url, ocjena, trajanje, lajkovano, zanr_id } = req.body;
    const q = "INSERT INTO PJESMA (naziv, url, ocjena, trajanje, Lajkovano, zanr_id) VALUES (?, ?, ?, ?, ?, ?)";
    db.query(q, [naziv, url, ocjena, trajanje, lajkovano, zanr_id], (err, data) => {
        if (err) return res.json(err);
        return res.json("Pjesma dodata!");
    });
});

//uzmi pjesmu po njenom ID-ju
app.get("/songs/:id",(req, res)=>{
    const {id}=req.params;
    const q="SELECT * FROM PJESMA WHERE ID=?";
    db.query(q, [id], (err, data)=>{
        if(err) return res.json(err);
        return res.json(data);
    });
});

//azuriraj podatke pjesme koja se vadi po ID-ju pjesme!!!
app.put("/songs/:id", (req, res)=>{
    const {id}=req.params;
    const { naziv, url, ocjena, trajanje, Lajkovano, zanr_id } = req.body;
    const q = "UPDATE PJESMA SET naziv = ?, url = ?, ocjena = ?, trajanje = ?, Lajkovano = ?, zanr_id = ? WHERE ID = ?";
    db.query(q, [naziv, url, ocjena, trajanje, Lajkovano, zanr_id, id], (err, data) => {
        if (err) return res.json(err);
        return res.json("Pjesma azurirana!");
    });
});

//brisanje pjesme po ID-ju!!!
app.delete("/songs/:id", (req, res)=>{
    const {id}=req.params;
    const q="DELETE from pjesma where ID=?";
    db.query(q, [id], (err, data)=>{
        if(err) return res.json(err);
        return res.json("Pjesma obrisana!");
    });
});

//--------------------PJESMA
//kreiraj korisnika
app.post("/users",(req, res)=>{
    const {username, password, slika, email, je_admin}=req.body;
    const q="insert into korisnik (username, password, slika, email, je_admin) values (?,?,?,?,?)";
    db.query(q, [username, password, slika, email, je_admin], (err, data)=>{
        if(err) return res.json(err);
        return res.json("Uspjesno kreiran korisnik!");
    });
});

//izlistaj sve korisnike
app.get("/users", (req, res)=>{
    const q="SELECT * from korisnik";
    db.query(q, (err, data)=>{
        if(err) return res.json(err);
        return res.json(data);
    });
});

//izlistaj korisnika po usernamu
app.get("/users/:username", (req, res)=>{
    const {username}=req.params;
    const q="select * from korisnik where username=?";
    db.query(q, [username], (err, data)=>{
        if(err) return res.json(err);
        return res.json(data);
    });
});

//azuriraj korisnika koji se dobija preko usernama!!!
app.put("/users/:username", (req, res)=>{
    const {username}=req.params;
    const {password, slika, email, je_admin}=req.body;
    const q="update korisnik set password=?, slika=?, email=?, je_admin=? where username=?";
    db.query(q, [password, slika, email, je_admin, username], (err, data)=>{
        if(err) return res.json(err);
        return res.json("Uspjesno azuriran korisnik!");
    });
});

//brisi korsnika koji se dobija preko usernama!!!
app.delete("/users/:username", (req, res)=>{
    const {username}=req.params;
    const q="delete from korisnik where username=?";
    db.query(q, [username], (err, data)=>{
        if(err) return res.json(err);
        return res.json("Uspjesno obrisan korisnik!");
    });
});

//--------PJESMA_KORISNIK-------(library)

//--------PJESMA_IZVODJAC-------(izvodi)

app.listen(8800, ()=>{
    console.log("povezan na back!");
});
