import type { User } from "#app/models/user.ts";
import type { IUserService } from "#app/contracts/IUserService.ts";
import { USERS_H } from "#app/config/users_hardcode.ts";

export class HardCodedUserService implements IUserService {
    getUserByUsername(username: string): User | null {
        const hardcodedUsers = USERS_H;

        return hardcodedUsers.find(user => user.username === username) ?? null
    }
}
