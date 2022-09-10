import React, {FormEvent} from "react";
import {IoCloseOutline} from "react-icons/io5";

import {Entity} from "../../../types/communication/responses/entity";

import SidePanel from "./SidePanel";

interface SidePanelFormProps<T extends Entity> {
    title: string;
    sidePanelId: string;
    isEditPanelOpen: boolean;
    handleClose: () => void;
    onSubmit: () => void;
    formInputs?: React.ReactNode;
    onFormInputChange?: (x: T) => void;
}

const SidePanelForm = <T extends Entity>({
     title,
     sidePanelId,
     isEditPanelOpen,
     handleClose,
     onSubmit,
     formInputs,
 }: SidePanelFormProps<T>) => {
    const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit();
    }

    return (
        <SidePanel id={sidePanelId} isOpen={isEditPanelOpen} handleClose={handleClose}>
            <div className="flex flex-col space-y-10 p-2">
                <div className="flex justify-between items-end">
                    <h6>{ title }</h6>
                    <button onClick={handleClose}>
                        <IoCloseOutline size={20} />
                    </button>
                </div>
                <form onSubmit={onSubmitHandler} className="flex flex-col space-y-5">
                    {formInputs}
                </form>
            </div>
        </SidePanel>
    );
};

export default SidePanelForm;
