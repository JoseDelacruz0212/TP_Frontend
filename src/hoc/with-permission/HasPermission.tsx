import React from "react";
import {useAuthContext} from "../../contexts/AuthContext";
import {HasPermissionPros} from "../../types/hoc/with-permission";

const HasPermission = ({ children, permission }: HasPermissionPros) => {
    const { hasPermissionFor } = useAuthContext();


    if (permission && !hasPermissionFor(permission)) {
        return null;
    }

    return (
        <>{children}</>
    );
};

export default HasPermission;
