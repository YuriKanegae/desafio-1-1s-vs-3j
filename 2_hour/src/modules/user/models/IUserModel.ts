import ILogModel from "./ILogModel";
import ITeamModel from "./ITeamModel";

interface IUserModel {
    id: string;
    name: string;
    age: number;
    score: number;
    active: boolean;
    country: string;
    team: ITeamModel;
    logs: Array<ILogModel>;
}

export default IUserModel;