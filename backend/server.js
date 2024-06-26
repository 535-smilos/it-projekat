import express from "express";
import mysql from "mysql";
import cors from "cors";
import cookieParser from "cookie-parser";

import songRoutes from "./routes/songs.js";
import userRoutes from "./routes/users.js";
import genreRoutes from "./routes/genre.js";
import artistRoutes from "./routes/artists.js";
import authRoutes from "./routes/auth.js";
import libraryRoutes from "./routes/library.js";
import performRoutes from "./routes/perform.js";
import newsRoutes from "./routes/news.js";

const app=express();

export const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "535170milos",
    database: "soundsphere"
});

app.use(cors());
app.use(express.json());
app.use(cookieParser());


app.use("/api/songs", songRoutes);
app.use("/api/genres", genreRoutes);
app.use("/api/artists", artistRoutes);
app.use("/api/library", libraryRoutes);
app.use("/api/performs", performRoutes);
app.use("/api/users", userRoutes);
app.use("/api/users", authRoutes);
app.use("/api/news", newsRoutes);

app.get("/", (req, res) => {
    res.json("HEllo this is bekend!");
});


app.listen(8800, () => {
    console.log("povezan na back!");
});
