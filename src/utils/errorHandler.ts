import { Request, Response, NextFunction } from "express";

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err) {
        console.log({ Title: "Error", Message: err.message, stackTrace: err.stack });
        res.send({ Title: "Error", Message: err.message });
    }
    else {
        console.log("No Error, All Good");
    }
};
export default errorHandler;