import { Request, Response } from "express";
import BaseController from "../../baseController";
import UserRepository from "../repositories/UserRepository";

interface ITeamInsight {
    leaders: number;
    totalMembers: number;
    activeMembers: number;
    completedProjects: number;
}

class GetTeamsInsightsController extends BaseController {

    public override async handleAsync(request: Request, response: Response): Promise<void> {
        const repository = new UserRepository();
        const users = repository.listUsers();

        const teamData: Record<string, ITeamInsight> = {};
        for(const user of users) {
            if(!teamData[user.team.name])
                teamData[user.team.name] = {
                    totalMembers: 0,
                    leaders: 0,
                    activeMembers: 0,
                    completedProjects: 0
                };

            teamData[user.team.name].totalMembers++;
            teamData[user.team.name].completedProjects += user.team.projects.filter( project => project.completed ).length;

            if(user.team.leader)
                teamData[user.team.name].leaders++;

            if(user.active)
                teamData[user.team.name].activeMembers++;
        }

        const insights = Object.keys(teamData).map( team => ({
            team: team,
            totalMembers: teamData[team].totalMembers,
            leaders: teamData[team].leaders,
            completedProjects: teamData[team].completedProjects,
            activePercentage: ( teamData[team].activeMembers / teamData[team].totalMembers ) * 100
        }));

        response.json(insights);
    }
}

export default GetTeamsInsightsController;