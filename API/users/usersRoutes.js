"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const usersCtrl_1 = require("./usersCtrl");
const router = express_1.default.Router();
router
    .delete("/:email", usersCtrl_1.deleteUserByID)
    .post("/login", usersCtrl_1.login)
    .post("/register", usersCtrl_1.register)
    .post("/update/:email", usersCtrl_1.updateUserByID);
exports.default = router;
