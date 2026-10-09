import { DB_AUTH_TOKEN_KEY } from '#front/constants/app.js';
import { FetchClient } from '#front/core/FetchClient.js';
import { Storage } from '#front/core/Storage'
import { AppUser } from '#front/types/types.js';

export class AuthenticationService {

    // Get token
    public static async authenticate(username: string): Promise<AppUser | null> {
        const url = '/token'

        const { jwt } = await FetchClient.get<{ jwt: string }>(url, `username=${username}`)

        if (!jwt) {
            console.error('Authentication failed: No JWT returned from server.')
            this.logout()
            return null
        }

        this.setStoreCurrentToken(jwt)

        return await this.getCurrentUser()
    }

    public static async getCurrentUser(): Promise<AppUser | null> {
        const jwt = this.getStoreCurrentToken()

        if (!jwt) {
            return null;
        }

        const url = '/api/current-user'
        const headers = { 'Authorization': `Bearer ${jwt}` }

        let userResponse = await FetchClient.get<{
            username: string;
            roles: string[];
        }>(url, '', headers)

        return this.createUserFromResponse(userResponse)
    }

    public static logout(): void {
        Storage.removeLocalItem(DB_AUTH_TOKEN_KEY)
        Storage.removeLocalItem('username')
    }

    public static getStoreCurrentToken(): string | null {
        return Storage.getLocalItem<string | null>(DB_AUTH_TOKEN_KEY)
    }

    // Private

    private static createUserFromResponse(response: { username: string; roles: string[] }): AppUser {
        return {
            username: response.username,
            roles: response.roles
        }
    }

    private static setStoreCurrentToken(token: string): void {
        Storage.setLocalItem(DB_AUTH_TOKEN_KEY, token)
    }






    ///////////////// V-A 2 //////////////
    //  public static async login() {
    //     const { token } = qs.parse(window.location.search.substring(1));
    //     if (!token) {
    //         const realm = await this.getRealm(window.location.origin);
    //         localStorage.setItem("redirect-portal-extranet", window.location.href);
    //         localStorage.setItem("realm", realm);
    //         window.location = `${AppUrls.SAML_LOGIN}-${realm}`;
    //     } else {
    //         localStorage.setItem(config.tokenKey, token.toString());
    //         let redirectHref = localStorage.getItem("redirect-portal-extranet");
    //         localStorage.removeItem("redirect-portal-extranet");
    //         await this.authenticate()
    //         window.location = redirectHref ? redirectHref as any : AppUrls.HOME;
    //     }
    // }


    ///////////////// V-A 3 //////////////
    // public static async authenticate() {
    //     const tokenInfo = await axiosService.get(ApiUrls.TOKEN_INFO_URL, false).then((response) => response.data);
    //     const heimdallId = tokenInfo.heimdallId;

    //     if (tokenInfo.roles.includes(ROLE_VA_METABASE_REQUESTER)) {
    //         this.getMetabaseUserToken();
    //     }
    //     store.dispatch(login(tokenInfo))
    //     let currentConfig = await UserConfigurationService.getCurrentConfigurationContract();


    // static isAuthenticated(): boolean {
    //     return !!Storage.getItem<string>(AUTH_TOKEN_KEY)
    // }

    // static setToken(token: string): void {
    //     Storage.setItem(AUTH_TOKEN_KEY, token)
    // }

    // static getToken(): string | null {
    //     return Storage.getItem<string>(AUTH_TOKEN_KEY)
    // }

    // static logout(): void {
    //     Storage.removeItem(AUTH_TOKEN_KEY)
    // }
}
