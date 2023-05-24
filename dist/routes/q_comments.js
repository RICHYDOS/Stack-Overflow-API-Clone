"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const tryCatch_1 = __importDefault(require("../middleware/tryCatch"));
const auth_1 = require("../middleware/auth");
const q_comments_1 = require("../controllers/q_comments");
const router = express_1.default.Router();
router.use(auth_1.auth);
router.get("/:id", (0, tryCatch_1.default)(q_comments_1.getOne));
router.put("/edit/:id", (0, tryCatch_1.default)(q_comments_1.update));
router.delete("/delete/:id", (0, tryCatch_1.default)(q_comments_1.destroy));
exports.default = router;
//# sourceMappingURL=q_comments.js.map