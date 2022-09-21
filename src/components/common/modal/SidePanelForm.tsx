import React, {FormEvent} from "react";
import { SchemaOf } from "yup";

import {IoCloseOutline} from "react-icons/io5";

import {Entity} from "../../../types/communication/responses/entity";

import SidePanel from "./SidePanel";
import useFormValidation from "../../../hooks/useFormValidation";

interface SidePanelFormProps<T extends Entity, K> {
    title: string;
    sidePanelId: string;
    isEditPanelOpen: boolean;
    handleClose: () => void;
    onSubmit: () => void;
    formInputs?: any;
    onFormInputChange?: (x: T) => void;
    showLoadingIndicator?: boolean;
    validationSchema?: SchemaOf<K>;
    values: T,
    onChange: (x: T) => void;
}

const SidePanelForm = <T extends Entity, K>({
    title,
    sidePanelId,
    isEditPanelOpen,
    handleClose,
    onSubmit,
    formInputs,
    showLoadingIndicator = false,
    validationSchema,
    values,
    onChange
 }: SidePanelFormProps<T, K>) => {
    const { isValid, errors } = useFormValidation(values, validationSchema);

    const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit();
    }

    return (
        <SidePanel id={sidePanelId} isOpen={isEditPanelOpen} handleClose={handleClose} showLoadingIndicator={showLoadingIndicator}>
            <div className="flex flex-col space-y-10 p-2">
                <div className="flex justify-between items-end">
                    <h6>{ title }</h6>
                    <button onClick={handleClose}>
                        <IoCloseOutline size={20} />
                    </button>
                </div>
                <form onSubmit={onSubmitHandler} className="flex flex-col space-y-5">
                    {
                        formInputs && formInputs({ onChange, values, isValid, errors })
                    }
                </form>
            </div>
        </SidePanel>
    );
};

export default SidePanelForm;
