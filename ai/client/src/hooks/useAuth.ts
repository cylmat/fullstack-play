import { useCallback, useContext } from 'preact/hooks'
import { AuthContext } from '#front/providers/AuthProvider.js';

/*
Hook (useAuth)
Put here anything that is:

Derived from context values: isGranted, isAuthenticated, isAdmin
A thin wrapper around a service + setUser: login, logout
A guard: the "must be used under a Provider" check
*/

type UseAuthReturn = {
    user: any,
    login: (username: string) => Promise<void>,
    logout: () => void,
    isGranted: (role: string) => boolean,
    isAuthenticated: boolean,
};

export function useAuth(): UseAuthReturn {
    const userContext = useContext(AuthContext);

    if (!userContext) {
        throw new Error('useAuth() doit être utilisé sous AuthenticationProvider');
    }

    const { user, login, logout } = userContext;

    // useCallback avoid recreate function each time
    const isGranted = useCallback(
        (role: string): boolean => {
            const roles = user?.roles?.map(role => role.toUpperCase()) ?? []
            return !!roles.includes(role.toUpperCase())
    }, [user]);

    return {
        user,
        login,
        logout,
        isGranted,
        isAuthenticated: !!user,
    };
}

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
