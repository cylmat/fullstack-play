import { USER_ANONYMOUS } from '#front/constants/app.js';
import { AppUser } from '#front/types/types.js';
import { createContext, type ComponentChildren } from 'preact'
import { useContext, useState } from 'preact/hooks';

/**
 * AUTH PROVIDER
 * Provides authentication context to the application.
 * Manages user authentication state and provides methods to update it.
 */

type AppUserContext = {
  user: AppUser | null;
  setUser: (user: AppUser | null) => void;
};

const defaultUser = { isAuthenticated: false, username: USER_ANONYMOUS, roles: [] };

export const AuthContext = createContext<AppUserContext>({
    user: defaultUser,
    setUser: () => {}
} as AppUserContext);


export function AuthProvider(props: { children: any }) {
    const [user, setUser] = useState<AppUser | null>(defaultUser);

    return (
        <AuthContext.Provider value={{ user, setUser }}>
           {props.children}
        </AuthContext.Provider>
    )
}
