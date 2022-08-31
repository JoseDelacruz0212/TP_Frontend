import React from "react";
import {Entity} from "../../communication/responses/entity";

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

export type FormInputs<T extends Entity> = {
    values: T;
    onChange?: (x: T) => void;
};

export type SidePanelFormProps<T extends Entity> = {
    createTitle: string;
    editTitle: string;
    sidePanelId: string;
    isEditPanelOpen: boolean;
    handleClose: () => void;
    onSubmit: () => void;
    formInputs?: React.ComponentType<FormInputs<T>>;
    values?: T,
    onFormInputChange?: (x: T) => void;
};
