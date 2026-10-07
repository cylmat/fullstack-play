import { useState, useEffect, useContext } from 'preact/hooks'
import { AuthContext } from '#front/providers/AuthProvider.js';
import { AppUser } from '#front/types/types.js';

export function useAuth(): AppUser | null {
    const { user } = useContext(AuthContext);

    if (!user) {
        throw new Error('useAuth doit être utilisé sous AuthenticationProvider');
    }

    return user;

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
