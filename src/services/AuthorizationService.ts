import authorizationClient from "../config/httpClients/authorizationClient";

import {AuthorizationResponse, UserAuthorizationResponse} from "../types/communication/responses/authorization";
import StorageService from "./StorageService";

class AuthorizationService {
    private permissions: {
        [x: string]: string[]
    } = {
        admin: ['*'],
    };

    signIn(userEmail: string, passwordUser: string) {
        authorizationClient.post<AuthorizationResponse>('/auth/login', { userEmail, passwordUser }).then(
            response => {
                this.saveUserData(response.data);
            },
            error => Promise.reject(error)
        );
    }

    signOut() {
        StorageService.clear();
    }

    isLoggedIn() {
        return StorageService.get<string>("accessToken") !== null;
    }

    hasPermissionFor(permission: string) {
        const user = this.getUserData();

        return user && user.roles.some(role =>
            this.permissions[role].includes("*") || this.permissions[role].includes(permission));
    }

    getUserName() {
        const user = this.getUserData();

        if (!user) return "";

        return `${user.name} ${user.lastName}`;
    }

    getAccessToken() {
        return StorageService.get<string>("accessToken");
    }

    private saveUserData(responseData: AuthorizationResponse) {
        StorageService.save<UserAuthorizationResponse>('user', responseData.data.user);
        StorageService.save<string>('accessToken', responseData.data.accessToken);
    }

    private getUserData() {
        return StorageService.get<UserAuthorizationResponse>("user");
    }
};

export default new AuthorizationService();
