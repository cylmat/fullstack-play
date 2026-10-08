# Infos

## Auth

- Authprovider: Provide context on { User, setUser }
```js
export function AppProvider(props: { children: any }) {
    return (
        <AuthProvider>
            {props.children}
        </AuthProvider>
    )
}
```

- RouteGuard: Redirect is user not allowed

- Login Page: use AuthenticationService to fetch jwt token

**Tips**

- Use user info in context (provider) for small projects
- Use redux if big project or shared user infos
- Use server-side HttpOnly,Secure,SameSite cookie instead of localStorage (faille XSS)
- header: credentials: "include", // envoie le cookie HttpOnly

**Check** /me (retrieve current user)

Flux recommandé

- Au login, le backend renvoie le JWT.
Le frontend le stocke.
Au démarrage de l’application, le frontend lit le token.
S’il existe, il appelle une route protégée, par exemple GET /me, avec Authorization: Bearer <token>.
Le backend vérifie le JWT et renvoie les informations de l’utilisateur. Le frontend initialise alors son état d’authentification.

**Refresh**

Le principe est d’utiliser deux tokens :

- Access token : durée courte (par exemple 5–15 min), envoyé avec les appels API.
Refresh token : durée plus longue, utilisé uniquement pour obtenir un nouvel access token.

Flux

- Au login, le backend renvoie l’access token et place le refresh token dans un cookie HttpOnly.
Quand l’access token expire, le frontend appelle POST /auth/refresh.
Le navigateur envoie automatiquement le cookie ; le backend le vérifie et renvoie un nouvel access token.
Le backend renouvelle aussi le refresh token et invalide l’ancien. Si le refresh token est invalide ou expiré, l’utilisateur doit se reconnecter.

- Au démarrage de l’application, appeler /auth/refresh pour récupérer un access token, puis /me pour recréer l’utilisateur. Vous pouvez aussi appeler le refresh automatiquement lorsqu’une requête API reçoit un 401, puis réessayer cette requête une fois.