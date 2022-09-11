import React from "react";

import ModalWrapper, {ModalProps} from "./ModalWrapper";
import useClickOutside from "../../../hooks/useClickOutside";
import useEscapeKey from "../../../hooks/useEscapeKey";

const SidePanel = ({ id, width, children, isOpen, handleClose, closeOnEscapeKey = true }: ModalProps) => {
    useEscapeKey(handleClose, closeOnEscapeKey);
    const elementRef = useClickOutside<HTMLDivElement>(() => handleClose && handleClose!());

    if (!isOpen) return null;

    return (
        <ModalWrapper wrapperId={id}>
            <div className="fixed inset-0 bg-black bg-opacity-50 flex flex-col items-end z-50">
                <div ref={elementRef} style={width ? { width } : {}} className={`h-full w-full sm:w-1/2 lg:w-1/3 bg-surface text-on-surface overflow-y-auto p-5`}>
                    { children }
                </div>
            </div>
        </ModalWrapper>
    )
};

export default SidePanel;
