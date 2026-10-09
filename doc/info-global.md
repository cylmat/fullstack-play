# Infos

## Auth


`AppProvider` enveloppe l’application avec `AuthProvider`. Le contexte rend l’utilisateur courant et les actions d’authentification (par exemple `user` et `setUser`) disponibles aux composants sans devoir les transmettre de parent en enfant. Le provider est le point central pour initialiser et mettre à jour l’état de connexion.

***Côté client (`ai/client`)***

- La page de login récupère les identifiants et appelle `AuthenticationService`. Ce service centralise les requêtes HTTP d’authentification, plutôt que de les placer dans les composants.
- Après une connexion réussie, le client met à jour le contexte avec l’utilisateur (souvent obtenu via `/me`) et redirige vers une page protégée. En cas d’échec, il affiche une erreur et ne marque pas l’utilisateur comme connecté.
- `RouteGuard` lit l’état du contexte : il laisse passer un utilisateur authentifié et redirige un utilisateur non autorisé vers la page appropriée. Il protège la navigation côté interface, mais ne remplace jamais les contrôles d’accès du serveur.
- Au rechargement de l’application, le client restaure la session en appelant les routes de session du serveur, puis initialise le contexte. Les composants peuvent afficher un état de chargement pendant cette vérification.
- Les composants déconnectent l’utilisateur via une action centralisée (service/provider), qui appelle le serveur si nécessaire, efface l’état local et redirige vers la page de login.

***Côté serveur (`ai/server`)***

- Le serveur reçoit les identifiants de connexion, les vérifie, puis crée les éléments de session prévus par l’application. Un identifiant ou un jeton n’est émis qu’après validation des identifiants.
- Les routes protégées valident l’authentification avant d’exécuter leur logique. Elles doivent aussi vérifier les autorisations requises pour la ressource demandée : être connecté ne signifie pas avoir accès à toutes les données.
- `GET /me` renvoie les informations de l’utilisateur correspondant à la session ou au jeton validé. Le client s’en sert pour recréer son état utilisateur ; cette route ne doit pas accepter une identité fournie librement par le client.
- `POST /auth/refresh` vérifie le refresh token et, s’il est valide, délivre un nouvel access token. Le serveur renouvelle/invalide le refresh token selon sa stratégie et refuse les jetons expirés, révoqués ou invalides.
- La déconnexion invalide la session ou le refresh token côté serveur et supprime le cookie associé. Les secrets de signature et les validations restent exclusivement côté serveur.

***Échange client / serveur***

1. Le client envoie les identifiants au endpoint de login ; le serveur les vérifie.
2. Le serveur renvoie l’access token et place le refresh token dans un cookie `HttpOnly`, si cette stratégie est utilisée.
3. Le client appelle les routes protégées avec l’access token. Pour le cookie, les requêtes cross-origin doivent inclure `credentials: "include"` et le serveur doit autoriser les credentials pour l’origine attendue.
4. À l’initialisation, le client peut appeler `/auth/refresh`, puis `/me`, afin de restaurer la session et l’utilisateur dans le contexte.
5. Si une requête reçoit `401`, le client peut tenter un refresh puis réessayer cette requête une seule fois. Si le refresh échoue, il efface l’état local et demande une nouvelle connexion.

Ne pas stocker le refresh token dans `localStorage` : un cookie `HttpOnly`, `Secure` et `SameSite` réduit son exposition au JavaScript. Si l’access token est stocké côté client, limiter sa durée de vie et éviter de le journaliser.

***Detail***

- AuthProvider: Provide context on { user, setUser, isUserLoading }
```js
export function AppProvider(props: { children: any }) {
    restoreSession() // retrieve /current-user and set it in current react state
    return (
         <AuthContext.Provider value={{ user, setUser, isUserLoading }}>
           {props.children}
        </AuthContext.Provider>
    )
}
```

- Login Page: use AuthenticationService to fetch jwt token
```js
let userFromBackend = await AuthenticationService.authenticate(username);
setUser(userFromBackend ?? anonymousUser);
```

- RouteGuard: Read current user and redirect if route is not allowed
```js
if (!rights) <Route redirect...>
```

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