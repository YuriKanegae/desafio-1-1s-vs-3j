import IProjectModel from "./IProjectModel";

interface ITeamModel {
    name: string;
    leader: boolean;
    projects: Array<IProjectModel>;
}

export default ITeamModel;