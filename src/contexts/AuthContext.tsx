import React, {createContext, useContext} from "react";

import {AuthProviderContext, AuthProviderProps} from "../types/contexts/auth";

import AuthorizationService from "../services/AuthorizationService";

const AuthContext = createContext<AuthProviderContext>({
    signIn: () => {},
    signOut: () => {},
    isLoggedIn: () => false,
    getUserName: () => "",
    hasPermissionFor: () => false
});

const AuthProvider = ({ children }: AuthProviderProps) => {
    const signIn = (username: string, password: string) => AuthorizationService.signIn(username, password);
    const signOut = () => AuthorizationService.signOut();
    const isLoggedIn = () => AuthorizationService.isLoggedIn();
    const getUserName = () => AuthorizationService.getUserName();
    const hasPermissionFor = (permission: string) => AuthorizationService.hasPermissionFor(permission);

    return (
        <AuthContext.Provider value={{
            signIn,
            signOut,
            isLoggedIn,
            getUserName,
            hasPermissionFor
        }}>
                { children }
        </AuthContext.Provider>
    )
};

export const useAuthContext = () => useContext(AuthContext);

export default AuthProvider;
