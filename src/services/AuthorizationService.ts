import authorizationClient from "../config/httpClients/authorizationClient";

import {AuthorizationResponse, UserAuthorizationResponse} from "../types/communication/responses/authorization";
import {permissionsByRole} from "../types/auth";

import StorageService from "./StorageService";

class AuthorizationService {
    private authEventAction?: () => void = undefined;

    signIn(userEmail: string, passwordUser: string): Promise<void> {
        return authorizationClient.post<AuthorizationResponse>('/auth/login', { userEmail, passwordUser })
            .then(
                response => {
                    this.saveUserData(response.data);
                },
                error => Promise.reject(error)
        );
    }

    signOut() {
        StorageService.clear();
    }

    addAuthListener(callback: () => void) {
        if (this.authEventAction) {
            this.removeAuthListener();
        }
        this.authEventAction = callback;
        window.addEventListener('storage', () => callback());
    };

    removeAuthListener() {
        if (!this.authEventAction) return;
        window.removeEventListener('storage', this.authEventAction);
    }

    isLoggedIn() {
        return StorageService.get<string>("accessToken") !== null;
    }

    hasPermissionFor(permission?: string) {
        const user = this.getUserData();

        if (!permission) return true;

        return user !== null && user.roles.some(role => {
            if (permissionsByRole[role].includes("*")) return true;

            return permissionsByRole[role].some(p =>
                p.includes("-*") ? permission.includes(p.substring(0, p.length - 2)) : p === permission
            );
        });
    }

    getUserName() {
        const user = this.getUserData();

        if (!user) return "";

        return `${user.name} ${user.lastName}`;
    }

    getUserImage() {
        const user = this.getUserData();

        if (!user) return "";

        return user.avatarUrl;
    }

    getAccessToken() {
        return StorageService.get<string>("accessToken");
    }

    getUserId() {
        const user = this.getUserData();

        if (!user) return "";

        return user.idUser;
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
