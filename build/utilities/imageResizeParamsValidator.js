"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validateParams = (req, res, next) => {
    const { width, height, fileName } = req.query;
    if (!width || !height || !fileName) {
        return res
            .status(400)
            .send('Width, height and fileName parameters are required');
    }
    next();
};
exports.default = validateParams;
