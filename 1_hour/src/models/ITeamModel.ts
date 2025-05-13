import IProjectModel from "./IProjectModel";

interface IteamModel {

    name:       string,
    leader:     boolean,
    projects:   Array<IProjectModel>;
}

export default IteamModel;