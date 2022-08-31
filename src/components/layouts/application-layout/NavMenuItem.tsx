import React from "react";

import {NavMenuItemProps} from "../../../types/components/layouts/application-layouts";

const NavMenuItemComponent = ({ item }: NavMenuItemProps) => {
    return (
        <div className="flex justify-center p-3">
            <div className="flex flex-col justify-center">
                <div className="flex justify-center">{item.icon}</div>
                <span className="subtitle block text-center">{item.label}</span>
            </div>
        </div>
    );
};

export default NavMenuItemComponent;
