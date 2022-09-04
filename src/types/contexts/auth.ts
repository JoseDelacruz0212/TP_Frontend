import React from "react";

export type AuthProviderContext = {
    signIn: (username: string, password: string) => void;
    signOut: () => void;
    isLoggedIn: boolean;
    getUserName: () => string;
    hasPermissionFor: (permission?: string) => boolean;
    goToFirstAllowedView: () => void;
};

export type AuthProviderProps = {
    children: React.ReactNode;
};
