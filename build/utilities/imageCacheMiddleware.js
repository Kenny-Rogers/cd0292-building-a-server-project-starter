"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const fetchCacheIfExist = (req, res, next) => {
    const { width, height, fileName } = req.query;
    const outputFile = `${fileName}x${width}x${height}`;
    const outputFilePath = `./processedImages/${outputFile}.jpg`;
    fs_1.default.stat(outputFilePath, (error, stats) => {
        if (!error) {
            res.set('Content-Type', 'image/jpeg');
            res.set('Content-Length', `${stats.size}`);
            fs_1.default.createReadStream(outputFilePath).pipe(res);
        }
    });
    next();
};
exports.default = fetchCacheIfExist;
