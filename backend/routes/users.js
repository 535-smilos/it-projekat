import express from "express";
import { deleteUserByUsername, getUserByUsername, getUsers, updateUserByUsername, updateUserPicture } from "../controllers/usercontroller.js";

const router=express.Router();

//izlistaj sve korisnike
router.get("/", getUsers);

//izlistaj korisnika po usernamu
router.get("/:username", getUserByUsername);

router.put("/pfp/:username", updateUserPicture);

//azuriraj korisnika koji se dobija preko usernama!!!
router.put("/:username", updateUserByUsername);

//brisi korsnika koji se dobija preko usernama!!!
router.delete("/:username", deleteUserByUsername);

export default router;