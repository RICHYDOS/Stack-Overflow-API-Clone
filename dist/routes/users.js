"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const tryCatch_1 = __importDefault(require("../middleware/tryCatch"));
const users_1 = require("../controllers/users");
dotenv_1.default.config();
const router = express_1.default.Router();
router.post("/register", (0, tryCatch_1.default)(users_1.register));
router.post("/login", (0, tryCatch_1.default)(users_1.login));
router.get("/:id", (0, tryCatch_1.default)(users_1.getOne));
router.put("/update/:id", (0, tryCatch_1.default)(users_1.update));
router.delete("/delete/:id", (0, tryCatch_1.default)(users_1.destroy));
exports.default = router;
//# sourceMappingURL=users.js.map