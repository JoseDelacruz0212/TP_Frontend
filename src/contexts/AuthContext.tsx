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
    hasPermissionFor: () => false
});

const AuthProvider = ({ children }: AuthProviderProps) => {
    const [isLoggedIn, setIsLoggedIn] = useState(AuthorizationService.isLoggedIn());

    useEffect(() => {
        AuthorizationService.addAuthListener(() => {
            setIsLoggedIn(AuthorizationService.isLoggedIn());
            navigate("/", { replace: true });
        });
        return () => AuthorizationService.removeAuthListener();
    }, []);

    const navigate = useNavigate();

    const signIn = (username: string, password: string) => {
        AuthorizationService.signIn(username, password).then(
            () => {
                const firstAllowedView = menuOptions.find(x => AuthorizationService.hasPermissionFor(x.permission));

                if (firstAllowedView) {
                    navigate(firstAllowedView.link);
                } else {
                    navigate("/", { replace: true });
                }
            },
            error => console.log(error)
        );
    }

    const signOut = () => {
        setIsLoggedIn(false);
        AuthorizationService.signOut();
        navigate("/", { replace: true });
    }

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
