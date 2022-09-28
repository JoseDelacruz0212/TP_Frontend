import React, {useMemo} from "react";
import moment from "moment";

import {Permissions} from "../../types/auth";

import MenuOptions from "../../components/common/menu/MenuOptions";

import {withObjectivesProvider} from "../../redux/providers/providers";

import withPermission from "../../hoc/with-permission/withPermission";

import TableView from "../layouts/TableView";
import {ConvertorCreator, FilterSchemaCreator} from "../../types/common";
import validationSchema from "../../validations/edit-forms/objective-edit-form-validation";
import {useLocation} from "react-router-dom";
import ObjectiveService from "../../services/ObjectiveService";
import {ObjectiveFilters} from "../../types/communication/requests/objective";
import {Objective} from "../../types/communication/responses/objective";
import ObjectiveEditForm from "../../containers/edit-forms/ObjectiveEditForm";
import ObjectivesMenuOptions from "../../components/menu-options/ObjectivesMenuOptions";

interface LocationState {
    courseId: string | undefined;
}

const Institutions = () => {
    const location = useLocation();
    const state = location.state as LocationState;

    const convertorCreator: ConvertorCreator<Objective> = (onEdit, onDelete) => (column, rowData) => {
        let value: React.ReactNode = null;

        switch (column) {
            case 1: value = <div className="py-4">{rowData.name}</div>; break;
            case 2: value = <div className="py-4">{rowData.description}</div>; break;
            case 3: value = <div className="py-4">{rowData.createdBy}</div>; break;
            case 4: value = <div className="py-4">{moment(rowData.createdOn).format('LLL')}</div>; break;
            case 5: value = (
                <div className="flex justify-end px-5">
                    <MenuOptions>
                        <ObjectivesMenuOptions rowData={rowData} onEdit={onEdit} onDelete={onDelete} />
                    </MenuOptions>
                </div>
            );
                break;
        };

        return value;
    };

    const defaultObjective: Objective = useMemo(() => ({
        name: '',
        description: '',
        courseId: state?.courseId || ''
    }), []);

    return (
        <div className="flex flex-col space-y-5">
            <TableView title="Lista de objetivos"
                       filterSchemaCreator={createFilterSchema}
                       convertorCreator={convertorCreator}
                       columns={columns}
                       service={ObjectiveService}
                       sidePanelId="edit-objective-side-panel"
                       sidePanelEditTitle="Editar objetivo"
                       sidePanelCreateTitle="Agregar objetivo"
                       formInputs={ObjectiveEditForm}
                       defaultItemSchema={defaultObjective}
                       updateValidationSchema={validationSchema}
                       addButtonText="Crear objetivo"
                       defaultFilters={{ courseId: state?.courseId || '' }} />
        </div>
    )
};

const createFilterSchema: FilterSchemaCreator<ObjectiveFilters> = (filters, onFiltersUpdate) => ([
]);

const columns = ["Nombre", "Descripción", "Creado por", "Fecha de creación", ""];

export default withPermission(withObjectivesProvider(Institutions), Permissions.OBJECTIVES);
