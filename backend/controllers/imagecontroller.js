import {db} from "../server.js";
import multer from "multer";

const storage=multer.diskStorage({
    destination: "./public/slike",
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});

const upload=multer({
    storage:storage
}).array("slika");

export const sendImage = (req, res) => {
    upload(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            return res.status(500).json({
                message: "A Multer error occurred when uploading.",
                error: err,
            });
        } else if (err) {
            return res.status(500).json({
                message: "An unknown error occurred when uploading.",
                error: err,
            });
        }
        return res.status(200).send(req.files[0]);
    });
};