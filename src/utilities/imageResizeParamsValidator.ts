import express from 'express';

type CallbackFunction = () => void;

const validateParams = (
  req: express.Request,
  res: express.Response,
  next: CallbackFunction
): void | express.Response => {
  const { width, height, name } = req.query;

  if (!width || !height || !name) {
    return res
      .status(400)
      .send('Width, height and name parameters are required');
  }

  next();
};

export default validateParams;
