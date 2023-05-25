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
    let comment;
    comment = yield models_1.default.A_comments.findOne({ where: { id: req.params.id } });
    if (comment === null) {
        res.status(400);
        throw new Error("Comment does not exist");
    }
    else if (comment.UserId !== req.currentUser.user.id) {
        res.status(400);
        throw new Error("Access Denied");
    }
    else {
        console.log(comment);
        return res.send(comment);
    }
});
exports.getOne = getOne;
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let comment;
    comment = yield models_1.default.A_comments.findOne({ where: { id: req.params.id } });
    if (comment === null) {
        res.status(400);
        throw new Error("Comment does not exist");
    }
    else if (comment.UserId !== req.currentUser.user.id) {
        res.status(400);
        throw new Error("Access Denied");
    }
    else {
        const title = req.body.title || comment.comment;
        comment = yield models_1.default.A_comments.update({ comment: title }, {
            where: {
                id: req.params.id
            }
        });
        return res.send("Comment Updated");
    }
});
exports.update = update;
const destroy = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let comment;
    comment = yield models_1.default.A_comments.findOne({ where: { id: req.params.id } });
    if (comment === null) {
        res.status(400);
        throw new Error("Comment does not exist");
    }
    else if (comment.UserId !== req.currentUser.user.id) {
        res.status(400);
        throw new Error("Access Denied");
    }
    else {
        yield models_1.default.A_comments.destroy({ where: { id: req.params.id } });
        return res.status(200).send("Comment deleted");
    }
});
exports.destroy = destroy;
//# sourceMappingURL=a_comments.js.map