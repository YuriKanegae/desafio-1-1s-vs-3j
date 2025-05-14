import { Request, Response } from "express";
import BaseController from "../../baseController";
import UserRepository from "../repositories/UserRepository";
import IUserModel from "../models/IUserModel";

class GetSuperUsersController extends BaseController {
    
    public override async handleAsync(request: Request, response: Response): Promise<void> {
        const repository = new UserRepository();
        const superUsers = repository.listUsers(
            ( user: IUserModel ) => user.active && user.score >= 900
        );

        response.json(superUsers);
    }
}

export default GetSuperUsersController;