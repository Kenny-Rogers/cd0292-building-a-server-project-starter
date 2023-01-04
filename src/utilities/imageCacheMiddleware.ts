import express from 'express';
import fs from 'fs';

type CallbackFunction = () => void;

const fetchCacheIfExist = (
  req: express.Request,
  res: express.Response,
  next: CallbackFunction
): void | express.Response => {
  const { width, height, fileName } = req.query;

  const outputFile = `${fileName}x${width}x${height}`;
  const outputFilePath = `./processedImages/${outputFile}.jpg`;

  fs.stat(outputFilePath, (error, stats) => {
    if (!error) {
      res.set('Content-Type', 'image/jpeg');
      res.set('Content-Length', `${stats.size}`);

      fs.createReadStream(outputFilePath).pipe(res);
    }
  });

  next();
};

export default fetchCacheIfExist;
