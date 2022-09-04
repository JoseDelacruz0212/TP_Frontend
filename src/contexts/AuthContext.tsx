import React, {createContext, useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

import {AuthProviderContext, AuthProviderProps} from "../types/contexts/auth";

import AuthorizationService from "../services/AuthorizationService";
import menuOptions from "../config/app/menu-options";

const AuthContext = createContext<AuthProviderContext>({
    signIn: () => {},
    signOut: () => {},
    isLoggedIn: false,
    getUserName: () => "",
    hasPermissionFor: () => false,
    goToFirstAllowedView: () => {}
});

const AuthProvider = ({ children }: AuthProviderProps) => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(AuthorizationService.isLoggedIn());

    useEffect(() => {
        AuthorizationService.addAuthListener(() => {
            setIsLoggedIn(AuthorizationService.isLoggedIn());
            navigate("/", { replace: true });
        });
        return () => AuthorizationService.removeAuthListener();
    }, []);


    const signIn = (username: string, password: string) => {
        AuthorizationService.signIn(username, password).then(
            () => {
                setIsLoggedIn(AuthorizationService.isLoggedIn());
                goToFirstAllowedView()
            },
            error => console.log(error)
        );
    }

    const goToFirstAllowedView = () => {
        const firstAllowedView = menuOptions.find(x => x.link && AuthorizationService.hasPermissionFor(x.permission));

        if (firstAllowedView) {
            navigate(firstAllowedView.link as string);
        } else {
            navigate("/", { replace: true });
        }
    }

    const signOut = () => {
        setIsLoggedIn(false);
        AuthorizationService.signOut();
        navigate("/", { replace: true });
    }

    const getUserName = () => AuthorizationService.getUserName();
    const hasPermissionFor = (permission?: string) => AuthorizationService.hasPermissionFor(permission);

    return (
        <AuthContext.Provider value={{
            signIn,
            signOut,
            isLoggedIn,
            getUserName,
            hasPermissionFor,
            goToFirstAllowedView
        }}>
                { children }
        </AuthContext.Provider>
    )
};

export const useAuthContext = () => useContext(AuthContext);

export default AuthProvider;
