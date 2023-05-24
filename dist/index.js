"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const index_1 = __importDefault(require("./models/index"));
const users_1 = __importDefault(require("./routes/users"));
const questions_1 = __importDefault(require("./routes/questions"));
const answers_1 = __importDefault(require("./routes/answers"));
const q_comments_1 = __importDefault(require("./routes/q_comments"));
const errorhandler_1 = __importDefault(require("./middleware/errorhandler"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 5000;
index_1.default.sequelize.sync({}).then(() => {
    console.log("Connected to the Database");
});
app.use(express_1.default.json());
app.use("/api/users", users_1.default);
app.use("/api/questions", questions_1.default);
app.use("/api/answers", answers_1.default);
app.use("/api/q_comments", q_comments_1.default);
app.use(errorhandler_1.default);
app.listen(port, () => {
    console.log(`Server running on Port ${port}`);
});
//# sourceMappingURL=index.js.map