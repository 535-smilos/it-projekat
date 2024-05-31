import express from "express";
import mysql from "mysql";

const app = express();

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "535170milos",
    database: "soundsphere"
});

app.use(express.json());

app.get("/", (req, res) => {
    res.json("HEllo this is bekend!");
});

//--------------------ZANR
//uzima sve zanrove
app.get("/api/genres", (req, res) => {
    const q = "select * from zanr";
    db.query(q, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

//uzima zanr po ID-ju zanra!!!
app.get("/api/genres/:id", (req, res) => {
    const q = "select * from zanr where id=?";
    const { id } = req.params;
    db.query(q, [id], (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

//dodaje zanr
app.post("/api/genres", (req, res) => {
    const q = "insert into zanr (`naziv`) VALUES (?)";
    const value = [req.body.naziv];
    db.query(q, value, (err, data) => {
        if (err) return res.json(err);
        return res.json("uspjesno dodat zanr!");
    });
});

//brise zanr, mada samo one koji nisu uvezani sa pjesmom!!!
app.delete("/api/genres/:id", (req, res) => {
    const q = "DELETE FROM zanr WHERE id = ?";
    const value = [req.params.id];
    db.query(q, value, (err, data) => {
        if (err) return res.json(err);
        if (data.affectedRows === 0) return res.status(404).json("zanr ne postoji!");
        return res.json("zanr uspjesno obrisan!");
    });
});

//azurira ime postojeceg zanra po id-ju zanra!!!
app.put("/api/genres/:id", (req, res) => {
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
app.get("/api/songs", (req, res) => {
    const q = "select * from pjesma";
    db.query(q, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

//kreiraj pjesmu
app.post("/api/songs", (req, res) => {
    const { naziv, url, ocjena, trajanje, zanr_id } = req.body;
    const q = "INSERT INTO PJESMA (naziv, url, ocjena, trajanje, zanr_id) VALUES (?, ?, ?, ?, ?)";
    db.query(q, [naziv, url, ocjena, trajanje, zanr_id], (err, data) => {
        if (err) return res.json(err);
        return res.json("Pjesma dodata!");
    });
});

//uzmi pjesmu po njenom ID-ju
app.get("/api/songs/:id", (req, res) => {
    const { id } = req.params;
    const q = "SELECT * FROM PJESMA WHERE ID=?";
    db.query(q, [id], (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

//azuriraj podatke pjesme koja se vadi po ID-ju pjesme!!!
app.put("/api/songs/:id", (req, res) => {
    const { id } = req.params;
    const { naziv, url, ocjena, trajanje, zanr_id } = req.body;
    const q = "UPDATE PJESMA SET naziv = ?, url = ?, ocjena = ?, trajanje = ?, zanr_id = ? WHERE ID = ?";
    db.query(q, [naziv, url, ocjena, trajanje, zanr_id, id], (err, data) => {
        if (err) return res.json(err);
        return res.json("Pjesma azurirana!");
    });
});

//brisanje pjesme po ID-ju!!!
app.delete("/api/songs/:id", (req, res) => {
    const { id } = req.params;
    const q = "DELETE from pjesma where ID=?";
    db.query(q, [id], (err, data) => {
        if (err) return res.json(err);
        return res.json("Pjesma obrisana!");
    });
});

//--------------------KORISNIK
//kreiraj korisnika
app.post("/api/users", (req, res) => {
    const { username, password, slika, email, je_admin } = req.body;
    const q = "insert into korisnik (username, password, slika, email, je_admin) values (?,?,?,?,?)";
    db.query(q, [username, password, slika, email, je_admin], (err, data) => {
        if (err) return res.json(err);
        return res.json("Uspjesno kreiran korisnik!");
    });
});

//izlistaj sve korisnike
app.get("/api/users", (req, res) => {
    const q = "SELECT * from korisnik";
    db.query(q, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

//izlistaj korisnika po usernamu
app.get("/api/users/:username", (req, res) => {
    const { username } = req.params;
    const q = "select * from korisnik where username=?";
    db.query(q, [username], (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

//azuriraj korisnika koji se dobija preko usernama!!!
app.put("/api/users/:username", (req, res) => {
    const { username } = req.params;
    const { password, slika, email, je_admin } = req.body;
    const q = "update korisnik set password=?, slika=?, email=?, je_admin=? where username=?";
    db.query(q, [password, slika, email, je_admin, username], (err, data) => {
        if (err) return res.json(err);
        return res.json("Uspjesno azuriran korisnik!");
    });
});

//brisi korsnika koji se dobija preko usernama!!!
app.delete("/api/users/:username", (req, res) => {
    const { username } = req.params;
    const q = "delete from korisnik where username=?";
    db.query(q, [username], (err, data) => {
        if (err) return res.json(err);
        return res.json("Uspjesno obrisan korisnik!");
    });
});

//---------------IZVODJAC
//uzmi sve izvodjace
app.get("/api/artists",(req, res)=>{
    const q="select * from izvodjac";
    db.query(q, (err, data)=>{
        if(err) return res.json(err);
        return res.json(data);
    });
});

//dodaj izvodjaca
app.post("/api/artists", (req, res)=>{
    const {ime}=req.body;
    const q="insert into izvodjac (ime) values (?)";
    db.query(q, [ime], (err, data)=>{
        if(err) return res.json(err);
        return res.json("Uspjesno kreiran korisnik!");
    });
});

//azuriraj ime izvodjaca po njegovom imenu, ovo mora sve preko body-ja(nece url da primi razmak)!!!
app.put("/api/artists",(req, res)=>{
    const {staro_ime, novo_ime}=req.body;
    const q="update izvodjac set ime=? where ime=?";
    db.query(q, [novo_ime, staro_ime], (err, data)=>{
        if(err) return res.json(err);
        if(data.affectedRows===0) return res.status(404).json("Izvodjac ne postoji!");
        return res.json("Uspjesno preimenovan korisnik!");
    });
});

//izbrisi izvodjaca, ponovo se navodi u body ime jer url i razmak
app.delete("/api/artists", (req, res)=>{
    const {ime}=req.body;
    const q="DELETE from izvodjac where ime=?";
    db.query(q, [ime], (err, data)=>{
        if(err) return res.json(err);
        return res.json("Uspjesno obrisan izvodjac!");
    });
});

//---------------PJESMA_KORISNIK(library)
//uzmi pjesme korisnika koje se nalaze u library-ju, tj koje je on lajkovao
app.get("/api/library/:username", (req, res) => {
    const { username } = req.params;
    const q = `
        SELECT PJESMA.*
        FROM PJESMA_KORISNIK
        INNER JOIN PJESMA ON PJESMA_KORISNIK.id_pjesma = PJESMA.ID
        WHERE PJESMA_KORISNIK.korisnik_username = ?
    `;
    db.query(q, [username], (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

//lajkuj pjesmu, tj za datog korisnika za neku pjesmu ubaci u pjesma_korisnik(library)
app.post("/api/library/:username/:song_id", (req, res) => {
    const { username, song_id } = req.params;
    const { ocjena } = req.body; //opciono

    // Check if the user exists
    const checkUserQuery = "SELECT * FROM KORISNIK WHERE username = ?";
    db.query(checkUserQuery, [username], (err, userResult) => {
        if (err) return res.json(err);

        if (userResult.length === 0) return res.status(404).json("User not found");

        // Check if the song exists
        const checkSongQuery = "SELECT * FROM PJESMA WHERE ID = ?";
        db.query(checkSongQuery, [song_id], (err, songResult) => {
            if (err) return res.json(err);

            if (songResult.length === 0) return res.status(404).json("Song not found");

            // Check if the user already liked the song
            const checkLikeQuery = "SELECT * FROM PJESMA_KORISNIK WHERE id_pjesma = ? AND korisnik_username = ?";
            db.query(checkLikeQuery, [song_id, username], (err, likeResult) => {
                if (err) return res.json(err);

                if (likeResult.length > 0) return res.status(400).json("User already liked this song");

                // Like the song
                const q = "insert into pjesma_korisnik (id_pjesma, korisnik_username, ocjena) values (?,?,?)";
                db.query(q, [song_id, username, ocjena || null], (err, data) => {
                    if (err) return res.json(err);
                    return res.json("uspjesno lajkovana pjesma!");
                })
            });
        });
    });
});

//vrati broj lajkovanih pjesama za korisnika
app.get("/api/library/:username/count", (req, res) => {
    const { username } = req.params;
    const q = `
            select count(*) as LikedCnt
            from pjesma_korisnik
            where korisnik_username=?
    `;
    db.query(q, [username], (err, data) => {
        if (err) return res.json(err);
        if (data.length === 0) return res.status(404).json("Korisnik ne postoji!");
        return res.json(data[0]);
    });
});

//azuriraj neku globalnu ocjenu za neku pjesmu, to je u atributu pjesme, ima vec gore u songs da se azuriraju citavi podaci
/*
app.put("/songs/ocjena/:song_id", (req, res) => {
    const { song_id } = req.params;
    const { ocjena } = req.body;

    const updateRatingQuery = 'UPDATE PJESMA SET ocjena = ? WHERE ID = ?';
    db.query(updateRatingQuery, [ocjena, song_id], (err, result) => {
        if (err) return res.json(err);
        return res.json("Globalna ocjena pjesme uspjesno azurirana!");
    });
});*/

//azuriraj ocjenu pjesme za korisnika u library-ju
app.put("/api/library/:username/:song_id", (req, res) => {
    const { username, song_id } = req.params;
    const { ocjena }=req.body;

    // Check if the user has liked the song
    const checkLikeQuery = "SELECT * FROM PJESMA_KORISNIK WHERE id_pjesma = ? AND korisnik_username = ?";
    db.query(checkLikeQuery, [song_id, username], (err, likeResults) => {
        if (err) return res.json(err);

        const likedSong = likeResults.length > 0;

        if (!likedSong) return res.status(400).json("User has not liked this song");

        // Update the rating for the song in the PJESMA_KORISNIK table
        const updateRatingQuery = 'UPDATE PJESMA_KORISNIK SET ocjena = ? WHERE id_pjesma = ? AND korisnik_username = ?';
        db.query(updateRatingQuery, [ocjena, song_id, username], (err, result) => {
            if (err) return res.json(err);
            return res.json("Ocjena pjesme za korisnika uspjesno azurirana!");
        });
    });
});

//dislajkuj pjesmu za korisnika, brise se objekat tabele pjesma_korisnik
app.delete("/api/library/:username/:song_id", (req, res) => {
    const { username, song_id } = req.params;

    const deleteLikeQuery = "DELETE FROM PJESMA_KORISNIK WHERE id_pjesma = ? AND korisnik_username = ?";
    db.query(deleteLikeQuery, [song_id, username], (err, result) => {
        if (err) return res.json(err);
        return res.json("Song disliked successfully");
    });
});

//prikazi ocjenu za datu pjesmu od datog korisnika!!!
app.get("/api/library/ocjena/:username/:song_id",(req, res)=>{
    const {username, song_id}=req.params;
    const q="select ocjena from pjesma_korisnik where id_pjesma=? and korisnik_username=?";
    db.query(q, [song_id, username], (err, data)=>{
        if(err) return res.json(err);
        if(data.length===0) return res.status(404).json("Ne postoji ocjena za ovu pjesmu od korisnika!");
        return res.json(data[0]);
    });
});


//--------PJESMA_IZVODJAC-------(izvodi) NAPOMENA: sve parametre stavljamo u body zahtjeva!
//vrati sve izvodjace sa njihovim pjesmama
app.get("/api/performs",(req, res)=>{
    const q="select * from pjesma_izvodjac";
    db.query(q, (err, data)=>{
        if(err) return res.json(err);
        return res.json(data);
    });
});

//vrati izvodjaceve pjesme tako da vrati citav objekat pjesme!
app.get("/api/performs/song", (req, res)=>{
    const {izvodjac}=req.body;
    const q="SELECT ID,naziv,url,ocjena,trajanje,zanr_id from pjesma p INNER JOIN pjesma_izvodjac pi ON pi.id_pjesma=p.ID WHERE pi.ime_izvodjac=?";
    db.query(q, [izvodjac], (err, data)=>{
        if(err) return res.json(err);
        return res.json(data);
    });
});

//uveži izvodjaca sa pjesmom
app.post("/api/performs", (req, res)=>{
    const {song_id, izvodjac}=req.body;
    const q="INSERT into pjesma_izvodjac (id_pjesma, ime_izvodjac) values (?,?)";
    db.query(q, [song_id, izvodjac], (err, data)=>{
        if(err) return res.json(err);
        return res.json("Uspjesno uvezani izvodjac i pjesma!");
    });
});

//izbrisati vezu pjesme i izvodjaca
app.delete("/api/performs", (req, res)=>{
    const {song_id, izvodjac}=req.body;
    const q="DELETE from pjesma_izvodjac where id_pjesma=? and ime_izvodjac=?";
    db.query(q, [song_id, izvodjac], (err, data)=>{
        if(err) return res.json(err);
        return res.json("Uspjesno izbrisana veza pjesme i izvodjaca!");
    });
});


app.listen(8800, () => {
    console.log("povezan na back!");
});
