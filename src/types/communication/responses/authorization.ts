export type UserAuthorizationResponse = {
    name: string;
    lastName: string;
    email: string;
    avatarUrl: string;
    roles: string[];
}

export type AuthorizationResponse = {
    message: string;
    data: {
        user: UserAuthorizationResponse,
        accessToken: string;
    }
};
