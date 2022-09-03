import React, {FormEvent} from "react";

import {IoCloseOutline} from "react-icons/io5";

import {SidePanelFormProps} from "../../../types/components/common/modal";
import {Entity} from "../../../types/communication/responses/entity";

import SidePanel from "./SidePanel";

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
                <form onSubmit={onSubmitHandler} className="flex flex-col space-y-10">
                    {formInputs}
                </form>
            </div>
        </SidePanel>
    );
};

export default SidePanelForm;
