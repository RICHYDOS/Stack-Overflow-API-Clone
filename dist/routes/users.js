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
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const models_1 = __importDefault(require("../models"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
const errorHandler_1 = require("../utils/errorHandler");
dotenv_1.default.config();
const router = express_1.default.Router();
router.post("/register", (0, errorHandler_1.errorHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const displayName = req.body.displayName;
    const email = req.body.email;
    const password = req.body.password;
    if (!displayName || !email || !password) {
        res.status(400);
        throw new Error("All Fields are Mandatory");
    }
    let user;
    user = yield models_1.default.User.findOne({ where: { email } });
    console.log(user);
    if (user !== null) {
        return res.send("User already Exists... Login Please");
    }
    else {
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        user = yield models_1.default.User.create({
            displayName,
            email,
            password: hashedPassword
        });
        if (user) {
            const result = { user_id: user.id, user_email: user.email };
            return res.status(201).send(result);
        }
        else {
            res.status(400);
            throw new Error("Invalid Data");
        }
    }
})));
router.post("/login", (0, errorHandler_1.errorHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.body.email;
    const password = req.body.password;
    if (!email || !password) {
        res.status(400);
        throw new Error("All Fields are Mandatory");
    }
    let user = yield models_1.default.User.findOne({ where: { email } });
    if (user && (yield bcrypt_1.default.compare(password, user.dataValues.password))) {
        user = user.dataValues;
        const accessToken = jsonwebtoken_1.default.sign({
            user: {
                username: user.username,
                email: user.email,
                id: user.id
            },
        }, process.env.ACCESSTOKENSECRET, { expiresIn: "4h" });
        res.status(200).send({ access_token: accessToken });
    }
    else {
        res.status(401);
        throw new Error("Email or Password are invalid");
    }
})));
exports.default = router;
//# sourceMappingURL=users.js.map