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
};

export const anonymousUser = {} as AppUser;

export const AuthContext = createContext<AppUserContext>({
    user: anonymousUser,
    setUser: () => {}
} as AppUserContext);


export function AuthProvider(props: { children: any }) {
    const [user, setUser] = useState<AppUser>(anonymousUser);

    async function restoreSession() {
    //   const token = localStorage.getItem("token");

    //   if (!token) {
        // setStatus("anonymous");
        // return;
    //   }

      try {
        // const currentUser = await AuthenticationService.getCurrentUser(token);
        // setUser(currentUser);
        // setStatus("authenticated");
      } catch {
        // localStorage.removeItem("token");
        // setUser(null);
        // setStatus("anonymous");
      }
    }

    useEffect(() => {
        restoreSession()
    }, [])

    return (
        <AuthContext.Provider value={{ user, setUser }}>
           {props.children}
        </AuthContext.Provider>
    )
}
