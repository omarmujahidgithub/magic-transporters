import { Request, Response, NextFunction } from 'express';

/**
 * Error handling middleware.
 * 
 * @param {any} err - The error object.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next middleware function.
 */
const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send({ error: err.message });
};

export default errorHandler;