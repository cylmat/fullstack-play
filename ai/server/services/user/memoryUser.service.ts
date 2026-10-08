import type { User } from "#app/models/user.ts";
import type { IUserService } from "#app/contracts/IUserService.ts";
import { USERS } from "#app/config/users_memory.ts";

export class MemoryUserService implements IUserService {
    getUserByUsername(username: string): User | null {
        return USERS.find(user => user.username === username) ?? null;
    }
}
