import express from "express";
import { getPets, getSinglePet } from "../controllers/petController.js";


const router = express.Router();

router.get("/", getPets)
router.get("/:id", getSinglePet)


export default router;