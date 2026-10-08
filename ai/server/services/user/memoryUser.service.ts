import { USERS } from "#app/config/users_memory.ts";
import { IUserService } from "#app/contracts/IUserService.ts";
import { User } from "#app/models/user.ts";

export class MemoryUserService implements IUserService {
    getUserByUsername(username: string): User | null {
        return USERS.find(user => user.username === username) ?? null;
    }
}
