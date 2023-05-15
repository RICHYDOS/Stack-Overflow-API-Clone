"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandler = (err, req, res, next) => {
    if (err) {
        console.log({ Title: "Error", Message: err.message, stackTrace: err.stack });
        res.send({ Title: "Error", Message: err.message });
    }
    else {
        console.log("No Error, All Good");
    }
};
exports.default = errorHandler;
//# sourceMappingURL=errorhandler.js.map