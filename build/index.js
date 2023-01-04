"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const sharp_1 = __importDefault(require("sharp"));
const memory_cache_1 = __importDefault(require("memory-cache"));
const fs_1 = __importDefault(require("fs"));
const imageResizeParamsValidator_1 = __importDefault(require("./utilities/imageResizeParamsValidator"));
const app = (0, express_1.default)();
const port = 3000;
app.get('/api', (req, res) => {
    res.send('Hello, world!');
});
app.get('/images', imageResizeParamsValidator_1.default, (req, res) => {
    const { width, height, fileName } = req.query;
    // Check if the image is already in the cache
    const key = `${fileName}x${width}x${height}`;
    const cachedImage = memory_cache_1.default.get(key);
    if (cachedImage) {
        return res.send(cachedImage);
    }
    //get file path
    const filePath = `./images/${fileName}.jpg`;
    //validate if file exists
    fs_1.default.stat(filePath, (error) => {
        if (error) {
            if (error.code === 'ENOENT') {
                return res.status(404).send('File not found');
            }
            return res.status(500).send(error);
        }
        const response = (0, sharp_1.default)(filePath)
            .resize(Number(width), Number(height))
            .toFormat('jpeg');
        // Stream the image to the response
        response.pipe(res);
        //store response in cache
        response.toBuffer().then((data) => {
            memory_cache_1.default.put(key, data, 3600 * 1000); // 1 hour
        });
    });
});
app.listen(port, () => {
    console.log(`server started at localhost:${port}`);
});
