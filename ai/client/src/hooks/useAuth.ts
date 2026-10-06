import { useState, useEffect } from 'preact/hooks'
import { AuthenticationService } from '#front/services/AuthenticationService'

export function useAuth() {
    // const [isAuthenticated, setIsAuthenticated] = useState(false)
    // const [isLoading, setIsLoading] = useState(true)

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
    return {
        isAuthenticated: false,
        isLoading: false,
    }
}
