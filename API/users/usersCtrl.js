"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserByID = exports.updateUserByID = exports.login = exports.register = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const userModel_1 = __importDefault(require("./userModel"));
const saltRounds = 10;
function register(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { email, password } = req.body;
            if (!email || !password)
                throw new Error("No E-mail and Password from client on FUNCTION register in file userCtrl"); // ne poluchili email and password // eto potom ubiraem s production posle proverok
            const salt = bcrypt_1.default.genSaltSync(saltRounds);
            const hash = bcrypt_1.default.hashSync(password, salt);
            const userDB = new userModel_1.default({ email: email, password: hash });
            yield userDB.save();
            if (!userDB)
                throw new Error("No user was created");
            res.send({ success: true, userDB });
        }
        catch (error) {
            res.status(500).send({ success: false, error: error.message });
        }
    });
}
exports.register = register;
function login(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { email, password } = req.body;
            const userDB = yield userModel_1.default.findOne({ email });
            if (!userDB)
                throw new Error("Email do not match");
            const isMatch = yield bcrypt_1.default.compare(password, userDB.password);
            if (!isMatch)
                throw new Error("Email and Password do not match");
            res.send({ success: true, userDB: userDB });
        }
        catch (error) {
            res.status(500).send({ success: false, error: error.message });
        }
    });
}
exports.login = login;
function updateUserByID(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const email = req.params.email;
            const findUser = yield userModel_1.default.findOne({ email });
            if (!findUser)
                throw new Error("Email do not match");
            const salt = bcrypt_1.default.genSaltSync(saltRounds);
            const hash = bcrypt_1.default.hashSync(req.body.password, salt);
            //const userDB = new UserModel({ email: email, password: hash });
            const userDB = yield userModel_1.default.findByIdAndUpdate(findUser, { password: hash });
            res.send({ success: true, userDB: userDB });
        }
        catch (error) {
            res.status(500).send({ success: false, error: error.message });
        }
    });
}
exports.updateUserByID = updateUserByID;
function deleteUserByID(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const email = req.params.email;
            const findUser = yield userModel_1.default.findOne({ email });
            if (!findUser)
                throw new Error("Email do not match");
            const userDB = yield userModel_1.default.findByIdAndDelete(findUser);
            res.send({ success: true, userDB: userDB });
        }
        catch (error) {
            res.status(500).send({ success: false, error: error.message });
        }
    });
}
exports.deleteUserByID = deleteUserByID;
