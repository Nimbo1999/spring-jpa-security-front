export interface AuthSuccessResponse {
    accessToken: string;
    tokenType: string;
    expiresIn: number;
}

export interface ErrorState {
    username: string[],
    password: string[]
}