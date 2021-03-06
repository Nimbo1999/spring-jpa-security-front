import Cookie from 'js-cookie';
import { AuthSuccessResponse } from '../utils/login.types';

class CookieService {

    public static setCookie(payload: AuthSuccessResponse): void {
        Cookie.set('app-cookie', JSON.stringify(payload), { expires: 1 });
    }

    public static getCookie(): AuthSuccessResponse | undefined {
        const result = Cookie.get('app-cookie');

        if (result) {
            try {
                return JSON.parse(result) as AuthSuccessResponse;
            } catch (err) {
                return undefined;
            }
        }

        return undefined;
    }

    public static deleteCookie(): void {
        Cookie.remove('app-cookie');
    }

}

export default CookieService;
