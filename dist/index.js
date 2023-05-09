"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const index_1 = __importDefault(require("./models/index"));
const users_1 = __importDefault(require("./routes/users"));
const errorHandler_1 = require("./utils/errorHandler");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 5000;
index_1.default.sequelize.sync({}).then(() => {
    console.log("Connected to the Database");
});
app.use(express_1.default.json());
app.use("/api/users", users_1.default);
app.use(errorHandler_1.errorHandler);
app.listen(port, () => {
    console.log(`Server running on Port ${port}`);
});
//# sourceMappingURL=index.js.map