export interface UserAuthorizationResponse {
    idUser: string;
    name: string;
    lastName: string;
    email: string;
    avatarUrl: string;
    roles: string[];
}

export interface AuthorizationResponse {
    message: string;
    data: {
        user: UserAuthorizationResponse,
        accessToken: string;
    }
};
