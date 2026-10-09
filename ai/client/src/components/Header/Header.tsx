import { useAuth } from '#front/hooks/useAuth.js'
import { useLocation } from 'preact-iso'

export function Header() {
    const { url } = useLocation()
    const { user, isGranted } = useAuth()

    return (
        <header class="d-flex justify-content-between">
            <nav>
                {user
                    ? <a href="/logout" class={url == '/logout' ? 'active' : ''}>
                        Logout
                    </a>
                    : <a href="/login" class={url == '/login' ? 'active' : ''}>
                        Login
                    </a>}
            </nav>
            <div>{user?.username}</div>
            <nav>
                <a href="/" class={url == '/' ? 'active' : ''}>
                    Home
                </a>
                {isGranted('USER') && <a href="/user" class={url == '/user' ? 'active' : ''}>
                    User
                </a>}
                {isGranted('ADMIN') && <a href="/admin" class={url == '/admin' ? 'active' : ''}>
                    Admin
                </a>}
                <a href="/404" class={url == '/404' ? 'active' : ''}>
                    404
                </a>
            </nav>
        </header>
    )
}
