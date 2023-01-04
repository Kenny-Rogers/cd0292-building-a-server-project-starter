import express from 'express';

type CallbackFunction = () => void;

const validateParams = (
  req: express.Request,
  res: express.Response,
  next: CallbackFunction
): void | express.Response => {
  const { width, height, fileName } = req.query;

  if (!width || !height || !fileName) {
    return res
      .status(400)
      .send('Width, height and fileName parameters are required');
  }

  next();
};

export default validateParams;
