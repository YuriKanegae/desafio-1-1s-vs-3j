import { Request, Response } from "express";
import asyncHandler from "express-async-handler"

class BaseController {
    public handle = asyncHandler(this.handleAsync);

    public async handleAsync(request: Request, response: Response): Promise<void> {
        throw new Error("not implemented");
    }
}

export default BaseController;