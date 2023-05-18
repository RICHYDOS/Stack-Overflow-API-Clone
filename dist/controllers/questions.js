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
exports.getAnswers = exports.createAnswer = exports.destroy = exports.update = exports.getOne = exports.create = void 0;
const models_1 = __importDefault(require("../models"));
;
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const title = req.body.title;
    const description = req.body.description;
    const expectation = req.body.expectation;
    const tags = req.body.tags;
    const UserId = req.currentUser.user.id;
    if (!title || !description) {
        res.status(400);
        throw new Error("Title and Description Fields are Mandatory");
    }
    let question;
    question = yield models_1.default.Question.create({
        title,
        description,
        expectation,
        tags,
        UserId
    });
    console.log(question);
    if (question) {
        return res.status(201).send(question);
    }
    else {
        res.status(400);
        throw new Error("Invalid Data");
    }
});
exports.create = create;
const getOne = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let question;
    question = yield models_1.default.Question.findOne({ where: { id: req.params.id } });
    if (question === null) {
        res.status(400);
        throw new Error("Question does not exist");
    }
    else if (question.UserId !== req.currentUser.user.id) {
        res.status(400);
        throw new Error("Access Denied");
    }
    else {
        console.log(question);
        return res.send(question);
    }
});
exports.getOne = getOne;
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let question;
    question = yield models_1.default.Question.findOne({ where: { id: req.params.id } });
    if (question === null) {
        res.status(400);
        throw new Error("Question does not exist");
    }
    else if (question.UserId !== req.currentUser.user.id) {
        res.status(400);
        throw new Error("Access Denied");
    }
    else {
        const title = req.body.title || question.title;
        const description = req.body.description || question.description;
        const expectation = req.body.expectation || question.expectation;
        const tags = req.body.tags || question.tags;
        question = yield models_1.default.Question.update({ title, description, expectation, tags }, {
            where: {
                id: req.params.id
            }
        });
        return res.send("User Updated");
    }
});
exports.update = update;
const destroy = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let question;
    question = yield models_1.default.Question.findOne({ where: { id: req.params.id } });
    if (question === null) {
        res.status(400);
        throw new Error("Question does not exist");
    }
    else if (question.UserId !== req.currentUser.user.id) {
        res.status(400);
        throw new Error("Access Denied");
    }
    else {
        yield models_1.default.Question.destroy({ where: { id: req.params.id } });
        return res.status(200).send("Question deleted");
    }
});
exports.destroy = destroy;
const createAnswer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let question;
    question = yield models_1.default.Question.findOne({ where: { id: req.params.id } });
    if (question === null) {
        res.status(400);
        throw new Error("Question does not exist");
    }
    else {
        const title = req.body.title;
        if (!title) {
            res.status(400);
            throw new Error("Title Field is Mandatory");
        }
        let answer;
        answer = yield models_1.default.Answer.create({
            answer: title,
            UserId: req.currentUser.user.id,
            QuestionId: question.id
        });
        console.log(answer);
        if (answer) {
            return res.status(201).send(answer);
        }
        else {
            res.status(400);
            throw new Error("Invalid Data");
        }
    }
});
exports.createAnswer = createAnswer;
const getAnswers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let answer;
    answer = yield models_1.default.Answer.findAll({ where: { QuestionId: req.params.id } });
    console.log(answer);
    if (answer === null) {
        res.status(400);
        throw new Error("No answers for this question");
    }
    else {
        return res.status(201).send(answer);
    }
});
exports.getAnswers = getAnswers;
//# sourceMappingURL=questions.js.map