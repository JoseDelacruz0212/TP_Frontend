import authorizationClient from "../config/httpClients/authorizationClient";

import {AuthorizationResponse, UserAuthorizationResponse} from "../types/communication/responses/authorization";
import StorageService from "./StorageService";

import {Roles} from "../types/app/auth";

class AuthorizationService {
    private permissions: {
        [x: string]: string[]
    } = {
        [Roles.ADMIN]: ["*"],
        [Roles.INSTITUTION]: ["COURSES-*"],
    };

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
            if (this.permissions[role].includes("*")) return true;

            return this.permissions[role].some(p =>
                p.includes("-*") ? permission.includes(p.substring(0, p.length - 2)) : p === permission
            );
        });
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
