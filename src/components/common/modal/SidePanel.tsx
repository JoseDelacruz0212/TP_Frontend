import React from "react";

import {ModalProps} from "../../../types/components/common/modal";

import ModalWrapper from "./ModalWrapper";

const SidePanel = ({ id, width, children, isOpen, handleClose, closeOnEscapeKey = true }: ModalProps) => {
    if (!isOpen) return null;

    return (
        <ModalWrapper wrapperId={id}>
            <div className="fixed inset-0 bg-black bg-opacity-50 flex flex-col items-end z-50">
                <div style={width ? { width } : {}} className={`h-full w-full sm:w-1/2 lg:w-1/3 bg-surface text-on-surface overflow-y-auto p-5`}>
                    { children }
                </div>
            </div>
        </ModalWrapper>
    )
};

export default SidePanel;
