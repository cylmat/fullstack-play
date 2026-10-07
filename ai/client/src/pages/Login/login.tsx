import { AuthContext } from '#front/providers/AuthProvider.js';
import { useContext, useEffect } from 'preact/hooks';
import { AuthenticationService } from '#front/services/AuthenticationService.js';
import './login.scss'

export function Login() {
    const { user, setUser } = useContext(AuthContext);

    useEffect(() => {
        // setUser({isAuthenticated: true, username: 'fdsgfdshglk9', roles: []});
    }, [])

    return (
        <div class="login">
            <h1>Login</h1>
        </div>
    )
}
