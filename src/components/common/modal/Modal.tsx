import React, {useEffect} from "react";

import ModalWrapper, {ModalProps} from "../portal/Portal";
import useEscapeKey from "../../../hooks/useEscapeKey";

const Modal = ({ id, width, children, isOpen, handleClose, closeOnEscapeKey = true }: ModalProps) => {
    useEscapeKey(handleClose, closeOnEscapeKey);

    if (!isOpen) return null;

    return (
        <ModalWrapper wrapperId={id}>
            <div className="fixed inset-0 bg-black bg-opacity-50 flex flex-col items-center py-10 px-5 z-50 overflow-y-auto">
                <div style={width ? { width } : {}} className={`bg-surface text-on-surface rounded-lg ${!width ? 'w-full md:w-2/3 lg:w-1/2' : ''}`}>
                    { children }
                </div>
            </div>
        </ModalWrapper>
    )
};

export default Modal;
