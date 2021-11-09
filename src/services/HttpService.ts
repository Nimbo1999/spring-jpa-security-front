import HttpRequestError from '../exceptions/HttpRequestError';
import LOCAL_STORAGE_KEYS from '../constants/LocalStorageKeys';

class HttpService {

    public static async get<Response>(url: string): Promise<Response> {
        const response = await fetch(url, { method: 'GET', headers: HttpService.defaultHeaders() });

        if (HttpService.hasValidStatusCode(response.status)) {
            return await response.json() as Response;
        }

        throw new HttpRequestError(`HTTP GET request failed to ${url}`, response.status);
    }

    public static async post<Response>(url: string, payload?: any): Promise<Response> {
        const response = await fetch(url, {
            method: 'POST',
            headers: HttpService.defaultHeaders(),
            body: payload ? JSON.stringify(payload) : undefined
        });

        if (HttpService.hasValidStatusCode(response.status)) {
            return await response.json() as Response;
        }

        throw new HttpRequestError(`HTTP POST request failed to ${url}`, response.status);
    }

    public static async put<Response>(url: string, payload?: any): Promise<Response> {
        const response = await fetch(url, {
            method: 'PUT',
            headers: HttpService.defaultHeaders(),
            body: payload ? JSON.stringify(payload) : undefined
        });

        if (HttpService.hasValidStatusCode(response.status)) {
            return await response.json() as Response;
        }

        throw new HttpRequestError(`HTTP PUT request failed to ${url}`, response.status);
    }

    public static async delete<Response>(url: string): Promise<Response> {
        const response = await fetch(url, {
            method: 'DELETE',
            headers: HttpService.defaultHeaders()
        });

        if (HttpService.hasValidStatusCode(response.status)) {
            return await response.json() as Response;
        }

        throw new HttpRequestError(`HTTP DELETE request failed to ${url}`, response.status);
    }

    private static defaultHeaders(): Headers {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const accessToken = localStorage.getItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN);
        const tokenType = localStorage.getItem(LOCAL_STORAGE_KEYS.TOKEN_TYPE);
        if (accessToken && tokenType) {
            headers.append('Authorization', `${tokenType} ${accessToken}`);
        }
        return headers;
    }

    private static hasValidStatusCode(status: number): boolean {
        const acceptedStatusCodeValues = [200, 201, 202, 204];
        return acceptedStatusCodeValues.includes(status);
    }

}

export default HttpService;
