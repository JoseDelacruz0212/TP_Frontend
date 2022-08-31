import React  from "react";

import { IoClose, IoMenu } from "react-icons/io5";

import {SideBarProps} from "../../../types/components/layouts/application-layouts";

const Header = ({ titleIcon, title, isMenuOpen, toggleOpen }: SideBarProps) => {
    return (
        <header className="flex justify-between items-center lg:block lg:static lg:w-60 p-2">
            <div className="flex justify-center items-center space-x-3">
                {titleIcon}
                <h5>{title}</h5>
            </div>
            <button className="lg:hidden" onClick={() => toggleOpen()}>
                { isMenuOpen ? <IoClose size={25} /> : <IoMenu size={25} /> }
            </button>
        </header>
    );
};

export default Header;
