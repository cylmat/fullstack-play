import { useContext } from 'preact/hooks'
import { AuthContext } from '#front/providers/AuthProvider.js';
import { AppUser } from '#front/types/types.js';

export function useUser(): { user: AppUser | null; isUserLoading: boolean } {
    const { user, isUserLoading } = useContext(AuthContext);

    if (!user) {
        throw new Error('useUser doit être utilisé sous AuthenticationProvider');
    }

    if (isUserLoading) {
        return { user: null, isUserLoading: true };
    }

    return { user: user && user.isAuthenticated ? user : null, isUserLoading: false };

    // useEffect(() => {
    //     setIsAuthenticated(AuthenticationService.isAuthenticated())
    //     setIsLoading(false)
    // }, [])

    // return {
    //     isAuthenticated,
    //     isLoading,
    //     login: (token: string) => {
    //         AuthenticationService.setToken(token)
    //         setIsAuthenticated(true)
    //     },
    //     logout: () => {
    //         AuthenticationService.logout()
    //         setIsAuthenticated(false)
    //     }
    // }
    // return {
    //     // isAuthenticated: false,
    //     // isLoading: false,
    // }
}
