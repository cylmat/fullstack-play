import {
    Router,
    Route
} from 'preact-iso'

import { Home } from '#front/pages/Home/index.js'
import { Login } from '#front/pages/Login/index.js'
import { NotFound } from '#front/pages/_404.js'
import { ProtectedRoute, PublicRoute } from '#front/components/RouteGuards'

type PathType = {
    path: string, component: any, right?: string[]
}

export function AppRouter() {

    const ROUTES: PathType[] = [
        { path: '/', component: Home, guard: ProtectedRoute },
        { path: '/login', component: Login, guard: PublicRoute, right: [] },
        { path: '/secure', component: () => <div>secure</div>, right: ['ADMIN']}
    ]

    // <Route path={path} component={() => <Guard component={component} />} />
    return (
        <Router>
            {ROUTES.map((route: PathType) => (
                <Route path={route.path} component={route.component} />
            ))}
            <Route default component={NotFound} />
        </Router>
    )
}
