import express from "express";
import { updateCompanion, updateGuard } from "../../controllers/producer/producer.js";
import { getToken } from "../../getToken.js";

const router = express.Router();

router.put("/update/companion", getToken, updateCompanion)
router.put("/update/guard", getToken, updateGuard)

export default router;
