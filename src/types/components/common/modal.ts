import React from "react";

export type ModalProps = {
    id: string;
    width?: number | string;
    children?: React.ReactNode;
    isOpen?: boolean;
    handleClose?: () => void;
    closeOnEscapeKey?: boolean;
};

export type ModalWrapperProps = {
    children: React.ReactNode;
    wrapperId: string;
};
