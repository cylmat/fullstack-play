import type { User } from "#app/models/user.ts";
import type { IUserService } from "#app/contracts/IUserService.ts";

export class HardCodedUserService implements IUserService {
    getUserByUsername(username: string): User | null {
        const hardcodedUsers = [
            { id: 'h', username: 'userH', roles: ['H'] }
        ];

        return hardcodedUsers.find(user => user.username === username) ?? null
    }
}
