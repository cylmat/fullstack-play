import { USERS } from "#app/config/users_memory.ts";

export function getMemoryUserByUsername(username: string) {
    return USERS.find(user => user.username === username)
}
