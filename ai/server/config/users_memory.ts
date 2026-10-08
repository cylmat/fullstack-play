import { User } from "#app/models/user.ts"

export const ADMIN: User = {
    id: '1',
    username: 'admin-username',
    roles: ['admin'],
}

const USER: User = {
    id: '2',
    username: 'user-username',
    roles: ['user'],
}

const READ: User = {
    id: '3',
    username: 'read-username',
    roles: ['read'],
}

export const USERS = [ADMIN, USER, READ]
