import React from "react";

import {NavMenuItem} from "../../../types/common";

interface NavMenuItemProps {
    item: NavMenuItem;
}

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
