import { AuthenticationService } from '#front/services/AuthenticationService.js';
import { AppUser } from '#front/types/types.js';
import { createContext, type ComponentChildren } from 'preact'
import { useCallback, useEffect, useMemo, useState } from 'preact/hooks';

/**
 * AUTH PROVIDER
 * Provides authentication context to the application.
 * Manages user authentication state and provides methods to update it.
 */

/*
Context (the Provider)
Put here anything that is state, or that must exist exactly once for the whole app:

user (state)
isUserLoading (state)
Side effects that should run once, not once per component: restoreSession() on startup
Anything that mutates state if you want to keep setUser private (see below)
*/

// Lors du reload server, recréer l’utilisateur (restoresession) au démarrage de l’application.
// Au montage, le provider lit le JWT, demande au serveur l’utilisateur correspondant, puis met à jour le contexte.
// Pendant cette vérification, gardez un état loading pour éviter une redirection prématurée vers la page de connexion.

/**
 * IMPROVEMENT
 * - Enforce the provider
 *    export const AuthContext = createContext<AppUserContext | undefined>(undefined);
 * - Avoid context value recreated on every render
 *    value = useMemo(() => ....
 * - Race condition / unmount safety in restoreSession
 *    let cancelled = false; if (!cancelled) restoreSession(); return () => { cancelled = true;
 * - use Login/logout instead of setUser() to avoid unconsistent state
 */

/**
 * STATE: data, loading, error, change state (login/logout)
 */
export type AppUserContext = {
  // Login/logout instead of setUser avoid inconsistent state
  user: AppUser | null;
  isUserLoading: boolean;
  login: (username: string) => Promise<void>;
  logout: () => void;
};

export const AuthContext = createContext<AppUserContext>({
    user: null,
    isUserLoading: true,
    login: async () => {},
    logout: () => {},
});


export function AuthProvider(props: { children: any }) {
    const [user, setUser] = useState<AppUser | null>(null)
    const [isUserLoading, setIsUserLoading] = useState<boolean>(true)

    const login = useCallback(async (username: string) => {
      const loggedInUser = await AuthenticationService.authenticate(username)
      setUser(loggedInUser);
    }, []);

    const logout = useCallback(() => {
      AuthenticationService.logout();
      setUser(null);
    }, []);

    // or (async () => {...})()
    async function restoreSession() {
      try {
        const currentUser = await AuthenticationService.getCurrentUser();
        setUser(currentUser ?? null);
      } catch (error) {
        console.error('Failed to restore session, remove user', error);
        setUser(null);
      } finally {
        setIsUserLoading(false);
      }
    }

    // Cancelled flag to prevent state updates if the component is unmounted
    useEffect(() => {
      let cancelled = false;
      if (!cancelled) restoreSession();
      return () => { cancelled = true; };
    }, [])

    const value = useMemo(() => ({
      user,
      isUserLoading,
      login,
      logout
    }), [user, isUserLoading]);

    return (
        <AuthContext.Provider value={value}>
           {props.children}
        </AuthContext.Provider>
    )
}
