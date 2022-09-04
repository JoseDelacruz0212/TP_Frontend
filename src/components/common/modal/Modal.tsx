import React, {useEffect} from "react";

import {ModalProps} from "../../../types/components/common/modal";

import ModalWrapper from "./ModalWrapper";

const Modal = ({ id, width, children, isOpen, handleClose, closeOnEscapeKey = true }: ModalProps) => {
    useEffect(() => {
        const closeOnEscapeKeyHandler = (e: KeyboardEvent) => e.key === 'Escape' ? handleClose && handleClose() : null;

        closeOnEscapeKey && document.body.addEventListener('keydown', closeOnEscapeKeyHandler);

        return () => {
            closeOnEscapeKey && document.body.removeEventListener('keydown', closeOnEscapeKeyHandler);
        }
    }, [handleClose]);

    if (!isOpen) return null;

    return (
        <ModalWrapper wrapperId={id}>
            <div className="fixed inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center z-50 px-5">
                <div style={width ? { width } : {}} className={`h-3/4 bg-surface text-on-surface rounded-lg ${!width ? 'w-full md:w-2/3 lg:w-1/2' : ''}`}>
                    { children }
                </div>
            </div>
        </ModalWrapper>
    )
};

export default Modal;
