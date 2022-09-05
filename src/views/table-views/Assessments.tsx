import React from "react";
import moment from "moment/moment";
import {Link, useLocation} from "react-router-dom";

import {ConvertorCreator, FilterSchemaCreator, MenuOptionsCreator} from "../../types/hooks/table";
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
import HasPermission from "../../hoc/with-permission/HasPermission";
import {WithCourseLocationState} from "../../types/location/state";

const defaultAssessment: Assessment = {
    name: '',
    availableOn: '',
    status: 0
};

const Assessments = () => {
    const location = useLocation();
    const state = location.state as WithCourseLocationState;

    const convertorCreator : ConvertorCreator<Assessment> = (onEdit, onDelete) => (column, rowData) => {
        let value: React.ReactNode = null;

        switch (column) {
            case 1: value = <div className="py-4">{rowData.name}</div>; break;
            case 2: value = <div className="py-4">{moment(rowData.availableOn).format('LLL')}</div>; break;
            case 3: value = <div className="py-4">{rowData.duration} minutos</div>; break;
            case 4: value = <div className="py-4">{rowData.courses?.institution?.name}</div>; break;
            case 5: value = <div className="py-4">{rowData.courses?.name}</div>; break;
            case 6: value = <div className="py-4">{rowData.createdBy}</div>; break;
            case 7: value = <div className="py-4">{moment(rowData.createdOn).format('LLL')}</div>; break;
            case 8: value = (
                <div className="flex justify-end px-5">
                    <MenuOptions options={getMenuOptions(onEdit, onDelete, rowData)} />
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
                       addButtonText="Crear evaluación"
                       canAddPermission={Permissions.ASSESSMENT_ADD}
                       defaultFilters={{ courseId: state?.courseId || '' }} />
        </div>
    )
}

const getMenuOptions: MenuOptionsCreator<Assessment> = (onEdit, onDelete, rowData) => [
    <HasPermission permission={Permissions.ASSESSMENT_VISUALIZE}>
        <Link to="/assessment-creator">
            <div role="button" className="menu-option">
                <div><IoEyeOutline /></div>
                <span>Visualizar</span>
            </div>
        </Link>
    </HasPermission>,
    <HasPermission permission={Permissions.ASSESSMENT_DESIGN}>
        <Link to="/assessment-creator">
            <div role="button" className="menu-option">
                <div><IoCreateOutline /></div>
                <span>Diseñar examen</span>
            </div>
        </Link>
    </HasPermission>,
    // <HasPermission permission="ASSESSMENT-PUBLISH">
    //     <div role="button" className="menu-option">
    //         <div><IoRocketOutline /></div>
    //         <span>Publicar</span>
    //     </div>
    // </HasPermission>,
    <HasPermission permission={Permissions.ASSESSMENT_EDIT}>
        <div role="button" className="menu-option text-secondary-dark" onClick={() => onEdit(rowData)}>
            <div><IoPencilOutline /></div>
            <span>Editar</span>
        </div>
    </HasPermission>,
    <HasPermission permission={Permissions.ASSESSMENT_DELETE}>
        <div role="button" className="menu-option text-error" onClick={() => onDelete(rowData.id!)}>
            <div><IoTrashOutline /></div>
            <span>Eliminar</span>
        </div>
    </HasPermission>,
];

const createFilterSchema: FilterSchemaCreator<AssessmentFilter> = (filters, onFiltersUpdate) => ([
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

const columns = ["Nombre", "Fecha de disponibilidad", "Duración", "Institución", "Curso", "Creado por", "Fecha de creación", ""];

export default withPermission(withAssessmentsProvider(Assessments), Permissions.ASSESSMENT);
