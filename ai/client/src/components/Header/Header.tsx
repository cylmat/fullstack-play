import { useUser } from '#front/hooks/useUser'
import { useLocation } from 'preact-iso'

export function Header() {
    const { url } = useLocation()
    const { user, isUserLoading } = useUser()

    let isAuth = user;

    return (
        <header class="d-flex justify-content-between">
            <nav>
                {!isUserLoading &&
                    (isAuth
                        ? <a href="/logout" class={url == '/logout' ? 'active' : ''}>
                            Logout
                        </a>
                        : <a href="/login" class={url == '/login' ? 'active' : ''}>
                            Login
                        </a>)}
            </nav>
            <div>{!isUserLoading ? user?.username : null}</div>
            <nav>
                <a href="/" class={url == '/' ? 'active' : ''}>
                    Home
                </a>
                <a href="/user" class={url == '/user' ? 'active' : ''}>
                    User
                </a>
                <a href="/admin" class={url == '/admin' ? 'active' : ''}>
                    Admin
                </a>
                <a href="/404" class={url == '/404' ? 'active' : ''}>
                    404
                </a>
            </nav>
        </header>
    )
}
