import { NextFunction, Request, Response } from "express";

function NormalizeResponse(request: Request, response: Response, next: NextFunction): void {

    // set initial information
    response.locals.timestamp = new Date();
    response.locals.initTime = performance.now();

    const originalJsonFunction = response.json;
    response.json = function( body?: any ) {
        return originalJsonFunction.apply(response, [{
            data: body,
            timestamp: response.locals.timestamp,
            executionTimeMs: performance.now() - response.locals.initTime,
        }]);
    }

    next();
}

export default NormalizeResponse;