import { DB_AUTH_TOKEN_KEY, STORAGE_USERNAME_KEY } from '#front/constants/app.js';
import { FetchClient } from '#front/core/FetchClient.js';
import { Storage } from '#front/core/Storage'
import { AppUser } from '#front/types/types.js';

export class AuthenticationService {

    public static async authenticate(username: string): Promise<AppUser> {
        const { jwt } = await FetchClient.get<{ jwt: string }>('/token', `username=${username}`)

        if (!jwt) {
            throw new Error('Authentication failed: No JWT returned from server.')
        }

        Storage.setDbValue(DB_AUTH_TOKEN_KEY, jwt)
        Storage.setItem(STORAGE_USERNAME_KEY, username)

        const user: AppUser = {
            username: username,
            isAuthenticated: true,
            roles: [],
            jwt: jwt
        }

        return user;
    }

    public static logout(): void {
        Storage.removeDbValue(DB_AUTH_TOKEN_KEY)
        Storage.removeItem(STORAGE_USERNAME_KEY)
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
