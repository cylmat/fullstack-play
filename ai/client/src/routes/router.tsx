import {
    Router,
    Route
} from 'preact-iso'

import { Home } from '#front/pages/Home/index.js'
import { Login } from '#front/pages/Login/login.js'
import { NotFound } from '#front/pages/_404.js'
import { RouteGuard } from '../components/RouteGuards'
import { Secure } from '#front/pages/Secure.js'
import { User } from '#front/pages/User.js'

type PathType = {
    path: string, component: any, right?: string[]
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


    const ROUTES: PathType[] = [
        { path: '/', component: Home },
        { path: '/login', component: Login },
        { path: '/user', component: User, right: ['USER'] },
        { path: '/secure', component: Secure, right: ['ADMIN'] }
    ]

    // <Route path={path} component={() => <Guard component={component} />} />
    return (
            <Router>
                {ROUTES.map((route: PathType) => (
                        <Route path={route.path} component={() =>
                            <RouteGuard key={route.path} rights={route.right}>
                                {route.component()}
                            </RouteGuard>}
                        />
                ))}
                <Route default component={NotFound} />
            </Router>
    )
}
