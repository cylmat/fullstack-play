import { User } from "#app/models/user.ts";

export interface IUserService {
    getUserByUsername(username: string): User | null
}
