import React, {useEffect} from "react";
import {useAuthContext} from "../../contexts/AuthContext";

const withPermission = <P extends {}>(Component: React.ComponentType<P>, permission?: string) =>
    (props: P) => {
        const { hasPermissionFor, goToFirstAllowedView } = useAuthContext();

        useEffect(() => {
            if (permission && !hasPermissionFor(permission)) {
                goToFirstAllowedView();
            }
        }, [])

        return (
            <>
                <Component { ...props as P } />
            </>
        )
    };

export default withPermission;
