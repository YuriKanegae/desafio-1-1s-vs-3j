import ILogModel from "./ILogModel";
import IteamModel from "./ITeamModel";

interface IUserModel {
  id: string,
  name: string,
  age: number,
  score: number,
  active: boolean,
  country: string,
  team: IteamModel,
  logs: Array<ILogModel>
}

export default IUserModel;