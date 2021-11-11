import HttpRequestError, { HttpRequestErrorContent } from '../exceptions/HttpRequestError';
import CookieService from './CookieService';
import { AuthSuccessResponse } from '../pages/login/login.types';

class HttpService {

    public static async get<Response>(url: string, auth?: AuthSuccessResponse): Promise<Response> {
        const response = await fetch(url, { method: 'GET', headers: HttpService.defaultHeaders(auth) });

        if (HttpService.hasValidStatusCode(response.status)) {
            if (HttpService.hasRequestStatusError(response)) {
                const content = await response.json() as HttpRequestErrorContent;
                throw new HttpRequestError(`HTTP GET request failed to ${url}`, content);
            }

            return await response.json() as Response;
        }

        throw new HttpRequestError('Invalid response status code');
    }

    public static async rawGet<Response>(url: string): Promise<Response> {
        const response = await fetch(url, { method: 'GET' });

        if (HttpService.hasValidStatusCode(response.status)) {
            if (HttpService.hasRequestStatusError(response)) {
                const content = await response.json() as HttpRequestErrorContent;
                throw new HttpRequestError(`HTTP GET request failed to ${url}`, content);
            }

            return await response.json() as Response;
        }

        throw new HttpRequestError('Invalid response status code');
    }

    public static async post<Response>(url: string, payload?: any): Promise<Response> {
        const response = await fetch(url, {
            method: 'POST',
            headers: HttpService.defaultHeaders(),
            body: payload ? JSON.stringify(payload) : undefined
        });

        if (HttpService.hasValidStatusCode(response.status)) {
            if (HttpService.hasRequestStatusError(response)) {
                const content = await response.json() as HttpRequestErrorContent;
                throw new HttpRequestError(`HTTP POST request failed to ${url}`, content);
            }

            return await response.json() as Response;
        }

        throw new HttpRequestError('Invalid response status code');
    }

    public static async put<Response>(url: string, payload?: any): Promise<Response> {
        const response = await fetch(url, {
            method: 'PUT',
            headers: HttpService.defaultHeaders(),
            body: payload ? JSON.stringify(payload) : undefined
        });

        if (HttpService.hasValidStatusCode(response.status)) {
            if (HttpService.hasRequestStatusError(response)) {
                const content = await response.json() as HttpRequestErrorContent;
                throw new HttpRequestError(`HTTP PUT request failed to ${url}`, content);
            }

            return await response.json() as Response;
        }

        throw new HttpRequestError('Invalid response status code');
    }

    public static async delete<Response>(url: string): Promise<Response> {
        const response = await fetch(url, {
            method: 'DELETE',
            headers: HttpService.defaultHeaders()
        });

        if (response.ok) {
            return null;
        }

        if (HttpService.hasValidStatusCode(response.status)) {
            if (HttpService.hasRequestStatusError(response)) {
                const content = await response.json() as HttpRequestErrorContent;
                throw new HttpRequestError(`HTTP DELETE request failed to ${url}`, content);
            }

            return await response.json() as Response;
        }

        throw new HttpRequestError('Invalid response status code');
    }

    private static defaultHeaders(optional?: AuthSuccessResponse): Headers {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        
        if (optional) {
            headers.append('Authorization', `${optional.tokenType} ${optional.accessToken}`);
            return headers;
        }

        const authCookie = CookieService.getCookie();

        if (authCookie) {
            headers.append('Authorization', `${authCookie.tokenType} ${authCookie.accessToken}`);
        }
        return headers;
    }

    private static hasValidStatusCode(status: number): boolean {
        const acceptedStatusCodeValues = [200, 201, 202, 204, 400, 401, 403, 404, 405, 500];
        return acceptedStatusCodeValues.includes(status);
    }

    private static hasRequestStatusError(response: Response) {
        const httpStatusError = [400, 401, 403, 404, 405, 500];
        return httpStatusError.includes(response.status);
    }

}

export default HttpService;
