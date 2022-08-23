import express from 'express';

const logger = (
  req: express.Request,
  res: express.Response,
  next: Function // eslint-disable-line
): void => {
  const url = req.url;
  console.log(url + ' was visisted');
  next();
};

export default logger;
