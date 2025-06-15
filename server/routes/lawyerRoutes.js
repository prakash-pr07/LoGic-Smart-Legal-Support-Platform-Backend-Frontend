import express from "express"
const router = express.Router();
import { getLawyersByCity, getLawyersByCityRadius } from "../controllers/lawyerController.js";


router.post("/city", getLawyersByCity);       // Default: Current City
router.post("/manual", getLawyersByCityRadius); // Manual: Select City

export default router;

