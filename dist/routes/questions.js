"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const tryCatch_1 = __importDefault(require("../middleware/tryCatch"));
const auth_1 = require("../middleware/auth");
const questions_1 = require("../controllers/questions");
const router = express_1.default.Router();
router.use(auth_1.auth);
router.get("/:id", (0, tryCatch_1.default)(questions_1.getOne));
router.post("/ask", (0, tryCatch_1.default)(questions_1.create));
router.put("/edit/:id", (0, tryCatch_1.default)(questions_1.update));
router.delete("/delete/:id", (0, tryCatch_1.default)(questions_1.destroy));
router.get("/:id/answers", (0, tryCatch_1.default)(questions_1.getAnswers));
router.post("/:id/answers", (0, tryCatch_1.default)(questions_1.createAnswer));
exports.default = router;
//# sourceMappingURL=questions.js.map