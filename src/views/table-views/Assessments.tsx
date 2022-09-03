import React from "react";
import moment from "moment/moment";

import {ConvertorCreator} from "../../types/hooks/table";
import {AssessmentFilter} from "../../types/communication/requests/asessments";
import {Assessment} from "../../types/communication/responses/assessment";
import {Permissions} from "../../types/app/auth";

import AssessmentService from "../../services/AssessmentService";

import Text from "../../components/common/table/filter-renderer/elements/Text";
import AssessmentEditForm from "../../containers/edit-forms/AssessmentEditForm";
import MenuOptions from "../../components/common/menu/MenuOptions";
import withPermission from "../../hoc/with-permission/withPermission";

import {withAssessmentsProvider} from "../../redux/providers/providers";

import TableView from "../layouts/TableView";
import {IoCreateOutline, IoEyeOutline, IoPencilOutline, IoRocketOutline, IoTrashOutline} from "react-icons/io5";
import {Entity} from "../../types/communication/responses/entity";

const defaultAssessment: Assessment = {
    name: '',
    availableOn: '',
};

const Assessments = () => {
    const convertorCreator : ConvertorCreator<Assessment> = (onEdit, onDelete) => (column, rowData) => {
        let value: React.ReactNode = null;

        switch (column) {
            case 1: value = <div className="py-4">{rowData.name}</div>; break;
            case 2: value = <div className="py-4">{moment(rowData.availableOn).format('LLL')}</div>; break;
            case 3: value = <div className="py-4">{rowData.duration} minutos</div>; break;
            case 4: value = <div className="py-4">{rowData.createdBy}</div>; break;
            case 5: value = <div className="py-4">{moment(rowData.createdOn).format('LLL')}</div>; break;
            case 6: value = (
                <div className="flex justify-end px-5">
                    <MenuOptions options={getMenuOptions<Assessment>(onEdit, onDelete, rowData)} />
                </div>
            );
                break;
        }
        return value;
    }

    return (
        <div className="flex flex-col space-y-5">
            <TableView title="Lista de evaluaciones"
                       filterSchemaCreator={createFilterSchema}
                       convertorCreator={convertorCreator}
                       columns={columns}
                       service={AssessmentService}
                       sidePanelId="edit-assessment-side-panel"
                       sidePanelEditTitle="Editar evaluación"
                       sidePanelCreateTitle="Agregar evaluación"
                       formInputs={AssessmentEditForm}
                       defaultItemSchema={defaultAssessment}
                       addButtonText="Crear evaluación" />
        </div>
    )
}

const getMenuOptions = <T extends Entity>(onEdit: (x: T) => void, onDelete: (x: string) => void, rowData: T) => [
    <div role="button" className="menu-option">
        <div><IoEyeOutline /></div>
        <span>Visualizar</span>
    </div>,
    <div role="button" className="menu-option">
        <div><IoCreateOutline /></div>
        <span>Diseñar examen</span>
    </div>,
    <div role="button" className="menu-option">
        <div><IoRocketOutline /></div>
        <span>Publicar</span>
    </div>,
    <div role="button" className="menu-option text-secondary-dark" onClick={() => onEdit(rowData)}>
        <div><IoPencilOutline /></div>
        <span>Editar</span>
    </div>,
    <div role="button" className="menu-option text-error" onClick={() => onDelete(rowData.id!)}>
        <div><IoTrashOutline /></div>
        <span>Eliminar</span>
    </div>
];

const createFilterSchema = (filters: AssessmentFilter, onFiltersUpdate: (x: AssessmentFilter) => any) => ([
    {
        id: "course-name-filter",
        type: Text,
        initialValue: filters.name,
        onChange: (value: string) => onFiltersUpdate({ ...filters, name: value }),
        withLabel: true,
        label: 'Nombre',
        placeholder: 'Nombre'
    }
])

const columns = ["Nombre", "Fecha de disponibilidad", "Duración", "Creado por", "Fecha de creación", ""];

export default withPermission(withAssessmentsProvider(Assessments), Permissions.ASSESSMENT);
