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
exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const auth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(next);
    const token = req.header("auth-token");
    if (!token) {
        res.status(401);
        throw new Error("User is not Authorized or Token is missing ");
    }
    ;
    try {
        const payload = jsonwebtoken_1.default.verify(token, process.env.ACCESSTOKENSECRET);
        req.currentUser = payload;
        next();
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.auth = auth;
//# sourceMappingURL=auth.js.map