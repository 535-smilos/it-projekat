import {db} from "../server.js"

export const getAllNews=(req, res)=>{
    const q="select * from novost";
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
    const news_id=req.params;
    const updated=req.body;
    const q="update table novost set naslov=?, opis=? values (?,?) where id_novost=?";
    db.query(q, [updated.noviNaslov, updated.noviOpis, news_id], (err, data)=>{
        if(err) return res.json(err);
        return res.json(data);
    });
};

export const deleteNews=(req, res)=>{
    const news_id=req.params;
    const q="delete from novost where id_novost=?";
    db.query(q, [news_id], (err, data)=>{
        if(err) return res.json(err);
        return res.json(data);
    })
}