import type { User } from "#app/models/user.ts";
import type { IUserService } from "#app/contracts/IUserService.ts";

export class userServiceClass implements IUserService {

    private userServices: IUserService[] = []

    constructor(userServices: IUserService[] = []) {
        this.userServices = userServices;

        // Allow calling of class's methods like static methods (userServiceClass.getUserByUsername())
        this.getUserByUsername = this.getUserByUsername.bind(this);
    }

    getUserByUsername(username: string): User | null {
        for (const service of this.userServices) {
            const user = service.getUserByUsername(username)
            if (user) {
                return user
            }
        }
        return null
    }
}
