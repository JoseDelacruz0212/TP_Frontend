import {useEffect, useRef} from "react";

const useClickOutside = <T extends HTMLElement>(onClickOutside: () => void) => {
    const elementRef = useRef<T>(null);

    useEffect(() => {
        const clickOutsideHandler = (event: any) => {
            if (elementRef.current && !elementRef.current.contains(event.target)) {
                onClickOutside();
            }
        }

        document.addEventListener("mousedown", clickOutsideHandler);

        return () => {
            document.removeEventListener("mousedown", clickOutsideHandler);
        }
    }, [elementRef]);

    return elementRef;
};

export default useClickOutside;
