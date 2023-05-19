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
exports.destroy = exports.update = exports.getOne = void 0;
const models_1 = __importDefault(require("../models"));
const getOne = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let answer;
    answer = yield models_1.default.Answer.findOne({ where: { id: req.params.id } });
    if (answer === null) {
        res.status(400);
        throw new Error("Answer does not exist");
    }
    else if (answer.UserId !== req.currentUser.user.id) {
        res.status(400);
        throw new Error("Access Denied");
    }
    else {
        console.log(answer);
        return res.send(answer);
    }
});
exports.getOne = getOne;
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let answer;
    answer = yield models_1.default.Answer.findOne({ where: { id: req.params.id } });
    if (answer === null) {
        res.status(400);
        throw new Error("Answer does not exist");
    }
    else if (answer.UserId !== req.currentUser.user.id) {
        res.status(400);
        throw new Error("Access Denied");
    }
    else {
        const title = req.body.title || answer.answer;
        answer = yield models_1.default.Answer.update({ answer: title }, {
            where: {
                id: req.params.id
            }
        });
        return res.send("Answer Updated");
    }
});
exports.update = update;
const destroy = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let answer;
    answer = yield models_1.default.Answer.findOne({ where: { id: req.params.id } });
    if (answer === null) {
        res.status(400);
        throw new Error("Answer does not exist");
    }
    else if (answer.UserId !== req.currentUser.user.id) {
        res.status(400);
        throw new Error("Access Denied");
    }
    else {
        let question = yield answer.getQuestion();
        yield question.decrement('answers');
        yield models_1.default.Answer.destroy({ where: { id: req.params.id } });
        return res.status(200).send("Answer deleted");
    }
});
exports.destroy = destroy;
//# sourceMappingURL=answers.js.map