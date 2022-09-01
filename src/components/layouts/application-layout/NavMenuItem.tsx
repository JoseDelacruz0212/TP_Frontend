import React from "react";

import {NavMenuItemProps} from "../../../types/components/layouts/application-layouts";

const NavMenuItemComponent = ({ item }: NavMenuItemProps) => {
    return (
        <div className="flex p-3">
            <div className="flex space-x-2">
                <div className="flex">{item.icon}</div>
                <span className="subtitle block">{item.label}</span>
            </div>
        </div>
    );
};

export default NavMenuItemComponent;
