import { Request, Response } from "express";
import BaseController from "../../baseController";
import UserRepository from "../repositories/UserRepository";

class GetActiveUsersPerDayController extends BaseController {

    public override async handleAsync(request: Request, response: Response): Promise<void> {
        
        const repository = new UserRepository();
        const users = repository.listUsers();
        const logs = users.flatMap( user => user.logs ).filter( log => log.action === "login");

        const loginCount: Record<string, number> = {};
        for( const log of logs) {
            if(!loginCount[log.date])
                loginCount[log.date] = 0;

            loginCount[log.date]++;
        }

        let info = Object.keys(loginCount).map( date => ({ date: date, total: loginCount[date] }));
        if(request.query.min && parseInt(request.query.min as string))
            info = info.filter( info => info.total > parseInt(request.query.min as string))

        response.json(info);
    }
}

export default GetActiveUsersPerDayController;