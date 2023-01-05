"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validateParams = (req, res, next) => {
    const { width, height, name } = req.query;
    if (!width || !height || !name) {
        return res
            .status(400)
            .send('Width, height and name parameters are required');
    }
    next();
};
exports.default = validateParams;
