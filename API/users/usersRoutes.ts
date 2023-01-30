import express from "express";
import { login, register, updateUserByID, deleteUserByID } from "./usersCtrl";

const router = express.Router();

router
  .delete("/:email", deleteUserByID)
  .post("/login", login)
  .post("/register", register)
  .post("/update/:email", updateUserByID)

export default router;

