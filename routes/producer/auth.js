import express from "express";
import { registerCompanion, registerGuard, loginCompanion, loginGuard, registerProducer, loginProducer } from "../../controllers/producer/auth.js";

const router = express.Router();

router.post("/register/producer", registerProducer)
router.post("/login/producer", loginProducer)

router.post("/register/companion", registerCompanion)
router.post("/login/companion", loginCompanion)
router.post("/register/guard", registerGuard)
router.post("/login/guard", loginGuard)

export default router;
