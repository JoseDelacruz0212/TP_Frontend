import React, {ReactElement, useState} from "react";

import { IoEllipsisVerticalOutline } from "react-icons/io5";
import useClickOutside from "../../../hooks/useClickOutside";

export type MenuOptionsProps = {
    options: ReactElement[]
};

const MenuOptions = ({ options }: MenuOptionsProps) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const elementRef = useClickOutside<HTMLDivElement>(() => setIsMenuOpen(false));

    return (
        <div className="absolute" ref={elementRef}>
            <button className="hover:bg-gray-100 p-1 rounded-full absolute -top-3 -right-3" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                <IoEllipsisVerticalOutline />
            </button>
            {
                isMenuOpen &&
                <div className="relative top-3 bg-surface border rounded-md shadow-md">
                    <ul>
                        {
                            options.map(
                                (option, index) =>
                                    <li key={index}>
                                        {option}
                                    </li>
                            )
                        }
                    </ul>
                </div>
            }
        </div>
    );
};

export default MenuOptions;
