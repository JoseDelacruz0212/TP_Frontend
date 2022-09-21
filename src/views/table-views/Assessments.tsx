import React from "react";
import moment from "moment/moment";
import {useLocation} from "react-router-dom";

import {AssessmentFilter} from "../../types/communication/requests/asessments";
import {Assessment} from "../../types/communication/responses/assessment";
import {Permissions} from "../../types/auth";
import {ConvertorCreator, FilterSchemaCreator} from "../../types/common";

import AssessmentService from "../../services/AssessmentService";

import Text from "../../components/common/table/filter-renderer/elements/Text";
import AssessmentEditForm from "../../containers/edit-forms/AssessmentEditForm";
import AssessmentStatus from "../../components/assessments/assessment-status/AssessmentStatus";
import withPermission from "../../hoc/with-permission/withPermission";

import {withAssessmentsProvider} from "../../redux/providers/providers";

import TableView from "../layouts/TableView";
import AssessmentsMenuOptions from "../../components/menu-options/AssessmentsMenuOptions";
import MenuOptions from "../../components/common/menu/MenuOptions";
import {toast} from "react-toastify";
import {useDispatch} from "react-redux";
import {useSliceActions} from "../../redux/providers/SliceProvider";
import validationSchema from "../../containers/edit-forms/validations/assessment-edit-form-validation";

const defaultAssessment: Assessment = {
    name: '',
    availableOn: '',
    status: 0,
    json: ''
};

interface LocationState {
    courseId: string | undefined;
}

const Assessments = () => {
    const location = useLocation();
    const state = location.state as LocationState;

    const dispatch = useDispatch();
    const { assessmentStatusChanged } = useSliceActions();

    const updateStatus = (assessment: Assessment) =>
        AssessmentService.saveItem(assessment)
            .then(() => {
                dispatch(assessmentStatusChanged(null));
                toast.success("El estado del examen se actualizó exitosamente")
            })
            .catch(() => toast.error("Ocurrió un error al tratar de actualizar el estado del examen"))

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
            case 8: value = <AssessmentStatus status={rowData.status} />; break;
            case 9: value = (
                    <div className="flex justify-end px-5">
                        <MenuOptions>
                            <AssessmentsMenuOptions rowData={rowData}
                                                    onEdit={onEdit}
                                                    onDelete={onDelete}
                                                    onUpdateStatus={updateStatus} />
                        </MenuOptions>
                    </div>
                ); break;
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
                       formValidationSchema={validationSchema}
                       defaultFilters={{ courseId: state?.courseId || '' }} />
        </div>
    )
}

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

const columns = ["Nombre", "Fecha de disponibilidad", "Duración", "Institución", "Curso", "Creado por", "Fecha de creación", "Estado", ""];

export default withPermission(withAssessmentsProvider(Assessments), Permissions.ASSESSMENT);
