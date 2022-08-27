import React, {ReactElement} from "react";
import {IconType} from "react-icons";

export type NavMenuItem = {
    key: number;
    label: string;
    icon?: ReactElement<IconType>;
    order: number;
    link: string;
}

interface NavMenuItemProps {
    item: NavMenuItem;
}

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
