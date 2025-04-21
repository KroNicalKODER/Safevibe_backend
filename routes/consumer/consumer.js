import express from "express";
import { updateConsumer, bookGuardInteraction, bookCompanionInteraction, updateInteractionDuration } from "../../controllers/consumer/consumer.js";
import { getToken } from "../../getToken.js";

const router = express.Router();

router.put("/update", getToken, updateConsumer);
router.post("/book-guard-interaction", getToken, bookGuardInteraction);
router.post("/book-companion-interaction", getToken, bookCompanionInteraction);
router.put("/update-interaction-duration", getToken, updateInteractionDuration);


export default router;  
