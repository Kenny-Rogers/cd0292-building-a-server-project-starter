"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const request = __importStar(require("request"));
describe('Images endpoint', () => {
    it('should return a resized image', (done) => {
        request.get({
            url: 'http://localhost:3000/images?width=200&height=200&fileName=fjord',
            encoding: null
        }, (error, response) => {
            expect(response.statusCode).toBe(200);
            expect(response.headers['content-type']).toBe('image/jpeg');
            done();
        });
    });
    it('should return a 400 error if the width or height parameter is missing', (done) => {
        request.get({
            url: 'http://localhost:3000/images?width=200&height=200',
            encoding: null
        }, (error, response) => {
            expect(response.statusCode).toBe(400);
            expect(response.body.toString()).toBe('Width, height and fileName parameters are required');
            done();
        });
    });
    it('should return a 404 error if the file is not found', (done) => {
        request.get({
            url: 'http://localhost:3000/images?width=200&height=200&fileName=ffjord',
            encoding: null
        }, (error, response) => {
            expect(response.statusCode).toBe(404);
            expect(response.body.toString()).toBe('File not found');
            done();
        });
    });
});
