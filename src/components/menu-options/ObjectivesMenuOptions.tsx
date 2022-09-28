import React from "react";
import {IoPencilOutline, IoTrashOutline} from "react-icons/io5";
import {Objective} from "../../types/communication/responses/objective";

interface ObjectivesMenuOptionsProps {
    rowData: Objective;
    onEdit: (x: Objective) => void;
    onDelete: (x: string) => void;
}

const ObjectivesMenuOptions = ({ rowData, onEdit, onDelete }: ObjectivesMenuOptionsProps) => (
    <>
        <div role="button" className="menu-option text-secondary-dark" onClick={() => onEdit(rowData)}>
            <div><IoPencilOutline /></div>
            <span>Editar</span>
        </div>
        <div role="button" className="menu-option text-error" onClick={() => onDelete(rowData.id!)}>
            <div><IoTrashOutline /></div>
            <span>Eliminar</span>
        </div>
    </>
);

export default ObjectivesMenuOptions;
