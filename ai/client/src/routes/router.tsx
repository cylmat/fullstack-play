import {
    Router,
    Route,
    useLocation
} from 'preact-iso'

import { Home } from '#front/pages/Home/index.js'
import { Login } from '#front/pages/Login/login.js'
import { NotFound } from '#front/pages/_404.js'
import { RouteGuard } from '../components/RouteGuards'
import { Secure } from '#front/pages/Secure.js'
import { User } from '#front/pages/User.js'
import { AuthContext } from '#front/providers/AuthProvider.js'
import { useContext } from 'preact/hooks'

type PathType = {
    path: string, component: any, roles?: string[]
}

export function AppRouter() {

    ////////// V-A 1 //////////////
    //   useEffect(() => {
    //     const pathName = history.location.pathname;
    //     const token = localStorage.getItem(config.tokenKey);
    //     if ((!token || token === 'undefined') && pathName !== ErrorRoutes.SSO_ERROR) {
    //         AuthenticateService.login()
    //             .then(() => { setIsLogged(true) })
    //     } else if (pathName !== ErrorRoutes.SSO_ERROR) {
    //         AuthenticateService.authenticate()
    //             .then(() => { setIsLogged(true) })
    //     }
    // }, [history]);

    function handleLogout() {
        const auth = useContext(AuthContext);
        auth.logout();
        window.location.href = '/';
    }

    const ROUTES: PathType[] = [
        { path: '/', component: Home },
        { path: '/admin', component: Secure, roles: ['ADMIN', 'ADMIN2'] },
        { path: '/user', component: User, roles: ['USER', 'USER2'] },
        { path: '/login', component: Login },
        { path: '/logout', component: () => { handleLogout(); } }
    ]

    // <Route path={path} component={() => <Guard component={component} />} />
    return (
            <Router>
                {ROUTES.map((route: PathType) => (
                        <Route path={route.path} component={() =>
                            <RouteGuard key={route.path} roles={route.roles}>
                                {route.component()}
                            </RouteGuard>}
                        />
                ))}
                <Route default component={NotFound} />
            </Router>
    )
}
