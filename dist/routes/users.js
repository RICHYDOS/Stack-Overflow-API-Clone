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
const router = express_1.default.Router();
const errorHandler_1 = require("../utils/errorHandler");
const models_1 = __importDefault(require("../models"));
router.post("/register", (0, errorHandler_1.errorHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let user;
    user = yield models_1.default.User.findOne({ where: { email: 'richardosunmu@gmail.com' } });
    if (user !== null) {
        return res.send("User already Exists... Login Please");
    }
    else {
        user = yield models_1.default.User.create({
            displayName: "Richard",
            email: "richardosunmu@gmail.com",
            password: "recharge123@"
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
exports.default = router;
//# sourceMappingURL=users.js.map