import { Request, Response, NextFunction } from 'express';
declare const notFound: (req: Request, res: Response, next: NextFunction) => void;
declare const errorHandler: (err: any, req: Request, res: Response, next: NextFunction) => void;
export { notFound, errorHandler };
