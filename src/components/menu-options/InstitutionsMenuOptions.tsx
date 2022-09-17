import React from "react";
import {IoPencilOutline} from "react-icons/io5";
import {Institution} from "../../types/communication/responses/institutions";

interface InstitutionsMenuOptionsProps {
    rowData: Institution;
    onEdit: (x: Institution) => void;
}

const InstitutionsMenuOptions = ({ rowData, onEdit }: InstitutionsMenuOptionsProps) => (
    <>
        <div role="button" className="menu-option text-secondary-dark" onClick={() => onEdit(rowData)}>
            <div><IoPencilOutline /></div>
            <span>Editar</span>
        </div>
        {/* <div role="button" className="menu-option text-error" onClick={() => onDelete(rowData.id!)}>
            <div><IoTrashOutline /></div>
            <span>Eliminar</span>
        </div> */}
    </>
);

export default InstitutionsMenuOptions;
