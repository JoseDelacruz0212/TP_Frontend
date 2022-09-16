import React, {createContext, useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

import AuthorizationService from "../services/AuthorizationService";
import menuOptions from "../config/app/menu-options";
import {toast} from "react-toastify";

interface AuthProviderContext {
    signIn: (username: string, password: string) => void;
    signOut: () => void;
    isLoggedIn: boolean;
    getUserName: () => string;
    hasPermissionFor: (permission?: string) => boolean;
    goToFirstAllowedView: () => void;
    getUserImage: () => string;
    getUserId: () => string;
};

interface AuthProviderProps {
    children: React.ReactNode;
};

const AuthContext = createContext<AuthProviderContext>({
    signIn: () => {},
    signOut: () => {},
    isLoggedIn: false,
    getUserName: () => "",
    hasPermissionFor: () => false,
    goToFirstAllowedView: () => {},
    getUserImage: () => "",
    getUserId: () => ""
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
    }, [navigate]);


    const signIn = (username: string, password: string) => {
        AuthorizationService.signIn(username, password).then(
            () => {
                setIsLoggedIn(AuthorizationService.isLoggedIn());
                goToFirstAllowedView()
            },
            () => toast.error("El usuario o contraseña ingresados son incorrectos o no está autorizado")
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
    const getUserImage = () => AuthorizationService.getUserImage();
    const hasPermissionFor = (permission?: string) => AuthorizationService.hasPermissionFor(permission);
    const getUserId = () => AuthorizationService.getUserId();

    return (
        <AuthContext.Provider value={{
            signIn,
            signOut,
            isLoggedIn,
            getUserName,
            hasPermissionFor,
            goToFirstAllowedView,
            getUserImage,
            getUserId
        }}>
                { children }
        </AuthContext.Provider>
    )
};

export const useAuthContext = () => useContext(AuthContext);

export default AuthProvider;
