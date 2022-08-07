"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Helper {
    sendResponse(res, statusCode, data) {
        res.status(statusCode).json({ result: data });
    }
}
exports.default = new Helper();
