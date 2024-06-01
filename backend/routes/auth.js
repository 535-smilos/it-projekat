import express from "express";
import { login, logout, register } from "../controllers/authcontroller.js";

const router=express.Router();

//kreiraj korisnika(REGISTER!!!)
router.post("/register", register);

//LOGIN ZA KORISNIKA!!!
router.post("/login", login);

//LOGOUT ZA KORISNIKA!!!!
router.post("/logout", logout);
export default router;