import { Request, Response } from "express";
import BaseController from "../baseController";

class ApiInfoController extends BaseController {

    public override async handleAsync(request: Request, response: Response): Promise<void> {
        response.status(200).send({
            message: "working"
        });
    }
}

export default ApiInfoController;