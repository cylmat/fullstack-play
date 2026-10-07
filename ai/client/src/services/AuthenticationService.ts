import { Storage } from '#front/core/Storage'
import { useContext } from 'preact/hooks';

const AUTH_TOKEN_KEY = 'auth_token'

export class AuthenticationService {

    public static authenticate() {
        return 'ttt-ref'
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
