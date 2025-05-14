import { Request, Response } from "express";

import IUserModel from "../models/IUserModel";
import BaseController from "../../baseController";
import UserRepository from "../repositories/UserRepository";

class CreateUsersController extends BaseController {

    public override async handleAsync(request: Request, response: Response): Promise<void> {
        
        if(!request.file) {
            response.status(400).send( { message: "users files is required." });
            return;    
        }

        const usersJSON = request.file.buffer.toString("utf8");
        const newUsers: Array<IUserModel> = JSON.parse(usersJSON);

        const repository = new UserRepository();
        const users = repository.addUsers(newUsers);

        response.json( {
            message: "users created.",
            userCount: users.length
        });
    }
}

export default CreateUsersController;