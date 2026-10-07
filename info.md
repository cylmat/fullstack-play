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