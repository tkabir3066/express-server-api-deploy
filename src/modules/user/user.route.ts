import { Router } from "express";
import { UserController } from "./user.controller";
import auth from "../../middlewares/auth";
import { UserRoles } from "../../types";

const router = Router();

router.post("/", UserController.createUser);
router.get(
  "/",
  auth(UserRoles.admin, UserRoles.agent),
  UserController.getAllUsers,
);
router.get("/:id", UserController.getSingleUser);

router.put("/:id", UserController.updateUser);

router.delete("/:id", UserController.deleteUser);
export const UserRoutes = router;
