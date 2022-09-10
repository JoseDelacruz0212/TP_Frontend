import React from "react";
import {useAuthContext} from "../../contexts/AuthContext";

export type HasPermissionProps = {
    children: React.ReactNode;
    permission?: string
};

const HasPermission = ({ children, permission }: HasPermissionProps) => {
    const { hasPermissionFor } = useAuthContext();


    if (permission && !hasPermissionFor(permission)) {
        return null;
    }

    return (
        <>{children}</>
    );
};

export default HasPermission;
