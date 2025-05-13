import IUserModel from "../models/IUserModel";

class UserRepository {

    private static users: Array<IUserModel> = [];

    public setUsers(users: Array<IUserModel>): void {
        UserRepository.users = users;
    }

    public getAllUsers(): Array<IUserModel> {
        return UserRepository.users;
    }
}

export default UserRepository;