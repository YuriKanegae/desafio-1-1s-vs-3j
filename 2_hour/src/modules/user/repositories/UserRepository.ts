import IUserModel from "../models/IUserModel";

class UserRepository {
    private static users: Array<IUserModel> = [];

    public addUsers(users: Array<IUserModel>): Array<IUserModel> {
        UserRepository.users.push(...users);

        return UserRepository.users;
    }

    public listUsers(filter?: (user: IUserModel) => boolean ): Array<IUserModel> {

        if(!filter)
            return UserRepository.users;

        return UserRepository.users.filter(filter);
    }
}

export default UserRepository;