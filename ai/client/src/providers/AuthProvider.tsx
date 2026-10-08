import { USER_ANONYMOUS } from '#front/constants/app.js';
import { AuthenticationService } from '#front/services/AuthenticationService.js';
import { AppUser } from '#front/types/types.js';
import { createContext, type ComponentChildren } from 'preact'
import { useContext, useEffect, useState } from 'preact/hooks';

/**
 * AUTH PROVIDER
 * Provides authentication context to the application.
 * Manages user authentication state and provides methods to update it.
 */

// Lors du reload server, recréer l’utilisateur (restoresession) au démarrage de l’application.
// Au montage, le provider lit le JWT, demande au serveur l’utilisateur correspondant, puis met à jour le contexte.
// Pendant cette vérification, gardez un état loading pour éviter une redirection prématurée vers la page de connexion.

type AppUserContext = {
  user: AppUser;
  setUser: (user: AppUser) => void;
  isUserLoading: boolean;
};

export const anonymousUser = { isAuthenticated: false } as AppUser;

export const AuthContext = createContext<AppUserContext>({
    user: anonymousUser,
    setUser: () => {},
    isUserLoading: true
} as AppUserContext);


export function AuthProvider(props: { children: any }) {
    const [user, setUser] = useState<AppUser>(anonymousUser);
    const [isUserLoading, setIsUserLoading] = useState<boolean>(true);

    async function restoreSession() {

      try {
        const currentUser = await AuthenticationService.getCurrentUser();
        setUser(currentUser ?? anonymousUser);
      } catch (error) {
        console.error('Failed to restore session, setting user to anonymous');
        setUser(anonymousUser);
      } finally {
        setIsUserLoading(false);
      }
    }

    useEffect(() => {
        restoreSession()
    }, [])

    return (
        <AuthContext.Provider value={{ user, setUser, isUserLoading }}>
           {props.children}
        </AuthContext.Provider>
    )
}
