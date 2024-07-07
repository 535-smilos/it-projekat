import express from "express";
import mysql from "mysql";
import cors from "cors";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";

import songRoutes from "./routes/songs.js";
import userRoutes from "./routes/users.js";
import genreRoutes from "./routes/genre.js";
import artistRoutes from "./routes/artists.js";
import authRoutes from "./routes/auth.js";
import libraryRoutes from "./routes/library.js";
import performRoutes from "./routes/perform.js";
import newsRoutes from "./routes/news.js";
import imageRoutes from "./routes/image.js";

const app=express();

export const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "535170milos",
    database: "soundsphere"
});

const __filename = fileURLToPath(import.meta.url);
console.log(__filename);
app.use(cors());
app.use(express.json());
app.use(express.static("./public"));
const __dirname = path.dirname(__filename);
const staticImagePath = path.join(__dirname, "public", "slike");

console.log(staticImagePath);  // Verify the path is correct

// Serve static files from the "public/slike" directory
app.use("/public/slike", express.static(staticImagePath));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended:true}));


app.use("/api/songs", songRoutes);
app.use("/api/genres", genreRoutes);
app.use("/api/artists", artistRoutes);
app.use("/api/library", libraryRoutes);
app.use("/api/performs", performRoutes);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/news", newsRoutes);
app.use("/api/image", imageRoutes);

app.get("/", (req, res) => {
    res.json("HEllo this is bekend!");
});

app.listen(8800, () => {
    console.log("povezan na back!");
});
