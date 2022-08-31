import React, {FormEvent} from "react";

import {IoCloseOutline} from "react-icons/io5";

import {SidePanelFormProps} from "../../../types/components/common/modal";
import {Entity} from "../../../types/communication/responses/entity";

import SidePanel from "./SidePanel";

const SidePanelForm = <T extends Entity>({
     createTitle,
     editTitle,
     sidePanelId,
     isEditPanelOpen,
     handleClose,
     onSubmit,
     formInputs: FormInputs,
     values,
     onFormInputChange
 }: SidePanelFormProps<T>) => {
    const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit();
    }

    return (
        <SidePanel id={sidePanelId} isOpen={isEditPanelOpen}>
            <div className="flex flex-col space-y-10 p-2">
                <div className="flex justify-between items-end">
                    <h6>{ values?.id ? editTitle : createTitle }</h6>
                    <button onClick={handleClose}>
                        <IoCloseOutline size={20} />
                    </button>
                </div>
                <form onSubmit={onSubmitHandler} className="flex flex-col space-y-10">
                    { FormInputs && values && <FormInputs values={values} onChange={onFormInputChange} /> }
                    <div className="flex space-x-2 justify-end">
                        <button type="submit" className="button-primary">
                            Guardar
                        </button>
                        <button className="button-secondary" onClick={handleClose}>
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </SidePanel>
    );
};

export default SidePanelForm;
