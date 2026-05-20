import { Router } from "express";
import { ProfileController } from "./profile.controller";

const router = Router();

router.post("/", ProfileController.createProfile);
export const ProfileRoutes = router;
