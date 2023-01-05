import sharp from 'sharp';
import fs from 'fs';

const generateFileName = (
  fileName: string,
  width: number,
  height: number
): string => `${fileName}x${width}x${height}`;

const getOutputFilePath = (fileName: string): string =>
  `./processedImages/${fileName}.jpg`;

const getInputFilePath = (fileName: string): string =>
  `./images/${fileName}.jpg`;

const fileExist = async (filePath: string): Promise<boolean> => {
    try {
      await fs.promises.stat(filePath);
      return true;
    } catch (error: any) {
      if (error.code === 'ENOENT') {
        return false;
      }
      throw error;
    }
  };

const readFile = (filePath: string): fs.ReadStream => {
  return fs.createReadStream(filePath);
};

const convertImage = async (
  fileName: string,
  width: number,
  height: number
): Promise<boolean> => {
  try {
    const image = sharp(getInputFilePath(fileName));
    image.resize(Number(width), Number(height));
    image.toFormat('jpeg');

    await image.toFile(getOutputFilePath(fileName));
    return true;
  } catch (error) {
    return false;
  }
};

export default {
  generateFileName,
  getOutputFilePath,
  getInputFilePath,
  fileExist,
  readFile,
  convertImage
};
