import express from 'express';
import imageLib from '../libs/imageLib';

type CallbackFunction = () => void;

const fetchCacheIfExist = async (
  req: express.Request,
  res: express.Response,
  next: CallbackFunction
): Promise<void | express.Response>  => {
  const { width, height, fileName } = req.query;

  const outputFilePath = imageLib.getOutputFilePath(
    imageLib.generateFileName(
      fileName as string,
      width as unknown as number,
      height as unknown as number
    )
  );

  const fileExist =  await imageLib.fileExist(outputFilePath);
  if (fileExist) {
    res.set('Content-Type', 'image/jpeg');

    imageLib.readFile(outputFilePath).pipe(res);
  }

  next();
};

export default fetchCacheIfExist;
