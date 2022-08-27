import React from "react";
import { Link } from "react-router-dom";

import NavMenuItemComponent, { NavMenuItem } from "./NavMenuItem";

interface NavMenuProps {
    items: NavMenuItem[];
    selected: number;
    onOptionSelected: (newOption: number) => void;
}

const NavMenu = ({ items, selected, onOptionSelected }: NavMenuProps) => {
    return (
        <nav className="flex flex-col space-y-2 py-10">
            {
                items
                    .sort((a, b) => a.order - b.order)
                    .map(item => (
                            <Link key={item.key} to={item.link} onClick={() => onOptionSelected(item.key)} className={`${selected === item.key ? 'bg-surface text-on-surface' : 'hover:bg-surface hover:text-on-surface hover:bg-opacity-50'}`}>
                                <NavMenuItemComponent item={item} />
                            </Link>
                        )
                    )
            }
        </nav>
    );
};

export default NavMenu;
