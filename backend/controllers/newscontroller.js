import {db} from "../server.js"

export const getAllNews=(req, res)=>{
    const q="select * from novost order by id_novost desc";
    db.query(q, (err, data)=>{
        if(err) return res.json(err);
        return res.json(data);
    });
};

export const postNews=(req, res)=>{
    const newNews=req.body;
    const q="insert into novost(naslov, opis) values(?,?)";
    db.query(q, [newNews.noviNaslov, newNews.noviOpis], (err, data)=>{
        if(err) return res.json(err);
        return res.json(data);
    });
};

export const updateNews=(req, res)=>{
    const news_id=req.params.id;
    const updated=req.body;
    const q="UPDATE novost SET naslov = ?, opis = ? WHERE id_novost = ?";
    db.query(q, [updated.noviNaslov, updated.noviOpis, news_id], (err, data)=>{
        if(err) return res.json(err);
        return res.json("Uspjesno izmijenjena novost!");
    });
};

export const deleteNews=(req, res)=>{
    const id_novost=req.params.id;
    console.log(id_novost);
    const q="delete from novost where id_novost=?";
    db.query(q, [id_novost], (err, data)=>{
        if(err) return res.json(err);
        return res.json(data);
    })
}