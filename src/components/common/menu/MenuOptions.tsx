import React, {Children, useEffect, useLayoutEffect, useRef, useState} from "react";

import { IoEllipsisVerticalOutline } from "react-icons/io5";
import useClickOutside from "../../../hooks/useClickOutside";
import Portal from "../portal/Portal";
import menuOptions from "../../../config/app/menu-options";

export type MenuOptionsProps = {
    children: React.ReactNode
}

const MenuOptions = ({ children }: MenuOptionsProps) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [containerRect, setContainerRect] = useState<DOMRect | undefined>(undefined);
    const elementRef = useClickOutside<HTMLDivElement>(() => setIsMenuOpen(false));

    const updateContainerRect = () => {
        const current = elementRef.current;

        if (current) {
            const containerRect = current.getBoundingClientRect();
            setContainerRect(containerRect);
        }
    }

    useLayoutEffect(() => {
        const onSizeUpdated = () => {
            updateContainerRect();
        }

        window.addEventListener('resize', onSizeUpdated);
        return () => window.removeEventListener('resize', onSizeUpdated);
    }, []);

    const onMenuOpen = () => {
        updateContainerRect();
        setIsMenuOpen(!isMenuOpen);
    };

    let style = {};

    if (containerRect) {
        style = {
            top: containerRect.top + 25,
            bottom: containerRect.bottom,
            left: containerRect.left,
            right: containerRect.right
        }
    }

    return (
        <>
            <button className="hover:bg-gray-100 p-1 rounded-full" onClick={onMenuOpen}>
                <IoEllipsisVerticalOutline />
            </button>
            <div ref={elementRef}>
            {
                isMenuOpen &&
                <Portal wrapperId="menu-options-wrapper">
                    <div className="absolute" style={style}>
                        <div className="absolute bg-surface right-0 border rounded-md shadow-md z-20">
                            <div className="min-w-[150px] w-max">
                                <ul>
                                    {
                                        Children.toArray(children).map(
                                            (option, index) =>
                                                <li key={index} onClick={() => setIsMenuOpen(false)}>
                                                    {option}
                                                </li>
                                        )
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
                </Portal>
            }
            </div>
        </>
    );
};

export default MenuOptions;
