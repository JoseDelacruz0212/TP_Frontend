import React from "react";

import {InstitutionActionsProps} from "../../types/components/institutions/institutions";

const InstitutionActions = ({ onEdit, onDelete }: InstitutionActionsProps) => (
    <div className="flex space-x-4">
        <button className="button-secondary w-24" onClick={onEdit}>
            Editar
        </button>
        <button className="button-error w-24" onClick={onDelete} >
            Eliminar
        </button>
    </div>
);

export default InstitutionActions;
