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
  user: AppUser;
  setUser: (user: AppUser) => void;
};

export const anonymousUser = {} as AppUser;

export const AuthContext = createContext<AppUserContext>({
    user: anonymousUser,
    setUser: () => {}
} as AppUserContext);


export function AuthProvider(props: { children: any }) {
    const [user, setUser] = useState<AppUser>(anonymousUser);

    return (
        <AuthContext.Provider value={{ user, setUser }}>
           {props.children}
        </AuthContext.Provider>
    )
}
