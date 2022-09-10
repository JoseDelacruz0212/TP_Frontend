import React, {ReactElement, useState} from "react";

import { IoEllipsisVerticalOutline } from "react-icons/io5";
import useClickOutside from "../../../hooks/useClickOutside";

export type MenuOptionsProps = {
    options: ReactElement[]
}

const MenuOptions = ({ options }: MenuOptionsProps) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const elementRef = useClickOutside<HTMLDivElement>(() => setIsMenuOpen(false));

    return (
        <div className="relative" ref={elementRef}>
            <button className="hover:bg-gray-100 p-1 rounded-full" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                <IoEllipsisVerticalOutline />
            </button>
            {
                isMenuOpen &&
                <div className="absolute bg-surface right-0 border rounded-md shadow-md z-20">
                    <div className="min-w-[150px] w-max">
                        <ul>
                            {
                                options.map(
                                    (option, index) =>
                                        <li key={index} onClick={() => setIsMenuOpen(false)}>
                                            {option}
                                        </li>
                                )
                            }
                        </ul>
                    </div>
                </div>
            }
        </div>
    );
};

export default MenuOptions;
