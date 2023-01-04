import express from 'express';
import sharp from 'sharp';
import fs from 'fs';
import validateParams from './utilities/imageResizeParamsValidator';
import fetchCacheIfExist from './utilities/imageCacheMiddleware';

const app = express();
const port = 3000;

app.get('/api', (req, res) => {
  res.send('Hello, world!');
});

app.get(
  '/images',
  [validateParams, fetchCacheIfExist],
  (req: express.Request, res: express.Response) => {
    const { width, height, fileName } = req.query;

    // Check if the image is already in the cache
    const outputFile = `${fileName}x${width}x${height}`;

    //get file path
    const filePath = `./images/${fileName}.jpg`;
    const outputFilePath = `./processedImages/${outputFile}.jpg`;

    //validate if file exists
    fs.stat(filePath, (error) => {
      if (error) {
        if (error.code === 'ENOENT') {
          return res.status(404).send('File not found');
        }
        return res.status(500).send(error);
      }

      sharp(filePath)
        .resize(Number(width), Number(height))
        .toFormat('jpeg')
        .toFile(outputFilePath)
        .then(() => {
          sharp(outputFilePath).pipe(res);
        })
        .catch((error) => {
          res.status(500).send(error);
        });
    });
  }
);

app.listen(port, () => {
  console.log(`server started at localhost:${port}`);
});
