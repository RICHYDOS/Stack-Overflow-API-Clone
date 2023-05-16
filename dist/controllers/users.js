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
exports.destroy = exports.update = exports.getOne = exports.login = exports.register = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const models_1 = __importDefault(require("../models"));
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const displayName = req.body.displayName;
    const email = req.body.email;
    const password = req.body.password;
    if (!displayName || !email || !password) {
        res.status(400);
        throw new Error("All Fields are Mandatory");
    }
    let user;
    user = yield models_1.default.User.findOne({ where: { email } });
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
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.body.email;
    const password = req.body.password;
    if (!email || !password) {
        res.status(400);
        throw new Error("All Fields are Mandatory");
    }
    let user;
    user = yield models_1.default.User.findOne({ where: { email } });
    if (user !== null) {
        let hashedPassword = user.password;
        if (user && (yield bcrypt_1.default.compare(password, hashedPassword))) {
            const accessToken = jsonwebtoken_1.default.sign({
                user: {
                    username: user.displayName,
                    email: user.email,
                    id: user.id
                },
            }, process.env.ACCESSTOKENSECRET, { expiresIn: "4h" });
            return res.status(200).send({ access_token: accessToken });
        }
        return res.send("something went wrong");
    }
    else {
        res.status(401);
        throw new Error("Email or Password are invalid");
    }
});
exports.login = login;
const getOne = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let user;
    user = yield models_1.default.User.findOne({ where: { id: req.params.id }, attributes: { exclude: ['password', 'updatedAt'] } });
    if (user !== null) {
        console.log(user);
        return res.send(user);
    }
    else {
        return res.send("User does not exist... Sign up Please");
    }
});
exports.getOne = getOne;
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let user;
    user = yield models_1.default.User.findOne({ where: { id: req.params.id } });
    if (user !== null) {
        const displayName = req.body.displayName || user.displayName;
        const email = req.body.email || user.email;
        const location = req.body.location || user.location;
        const title = req.body.title || user.title;
        const aboutMe = req.body.aboutMe || user.aboutMe;
        user = yield models_1.default.User.update({ displayName, email, location, title, aboutMe }, {
            where: {
                id: req.params.id
            }
        });
        return res.send("User Updated");
    }
    else {
        return res.send("User does not exist... Sign up Please");
    }
});
exports.update = update;
const destroy = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let user;
    user = yield models_1.default.User.findOne({ where: { id: req.params.id } });
    if (user !== null) {
        yield models_1.default.User.destroy({ where: { id: req.params.id } });
        return res.status(200).send("User deleted");
    }
    else {
        return res.send("User does not exist... Sign up Please");
    }
});
exports.destroy = destroy;
//# sourceMappingURL=users.js.map