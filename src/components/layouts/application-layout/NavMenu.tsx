import React from "react";
import { Link } from "react-router-dom";

import NavMenuItemComponent  from "./NavMenuItem";

import {NavMenuProps} from "../../../types/components/layouts/application-layouts";

const NavMenu = ({ items, selected, onOptionSelected }: NavMenuProps) => {
    return (
        <nav className="flex flex-col space-y-2 py-10">
            {
                items
                    .sort((a, b) => a.order - b.order)
                    .map(item => item.link ?
                        (
                            <Link key={item.key} to={item.link} onClick={() => onOptionSelected(item.key)} className={`${selected && selected === item.key ? 'bg-surface text-on-surface' : 'hover:bg-surface hover:text-on-surface hover:bg-opacity-50'}`}>
                                <NavMenuItemComponent item={item} />
                            </Link>
                        )
                        :
                        (
                            <div role="button" key={item.key} onClick={() => onOptionSelected(item.key)} className={`${selected && selected === item.key ? 'bg-surface text-on-surface' : 'hover:bg-surface hover:text-on-surface hover:bg-opacity-50'}`}>
                                <NavMenuItemComponent item={item} />
                            </div>
                        )
                    )
            }
        </nav>
    );
};

export default NavMenu;
