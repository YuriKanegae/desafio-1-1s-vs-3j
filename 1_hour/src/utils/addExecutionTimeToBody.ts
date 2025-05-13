import { Response } from "express";

function addExecutionTimeToBody(response: Response, body: any): any {
    const requestTimestamp: string = response.locals.timeStamp;
    const initTime: number = response.locals.initTime;
    const executionTime = performance.now() - initTime;

    return {
        data:               body,
        timestamp:          requestTimestamp,
        execution_time_ms:  executionTime,
    };
}

export default addExecutionTimeToBody;