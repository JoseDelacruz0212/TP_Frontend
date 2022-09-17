import React from "react";
import If from "../common/logic/If";
import {AssessmentStatus as AssessmentStatusOptions} from "../../types/assessment-status";
import HasPermission from "../../hoc/with-permission/HasPermission";
import {Permissions} from "../../types/auth";
import {IoCreateOutline, IoEyeOutline, IoPencilOutline, IoTrashOutline} from "react-icons/io5";
import {Link} from "react-router-dom";
import {Assessment} from "../../types/communication/responses/assessment";

interface AssessmentMenuOptionsProps {
    rowData: Assessment;
    onEdit: (x: Assessment) => void;
    onDelete: (x: string) => void;
    onUpdateStatus: (x: Assessment) => void;
}

const AssessmentsMenuOptions = ({ rowData, onEdit, onDelete, onUpdateStatus }: AssessmentMenuOptionsProps) => (
    <>
        {/*<If condition={rowData.status === AssessmentStatusOptions.FINISHED}>
            <HasPermission permission={Permissions.ASSESSMENT_QUALIFICATIONS}>
                <Link to={`/qualifications/${rowData.id}`} state={{
                    assessmentId: rowData.id,
                    status: rowData.status,
                    subtitle: rowData.name
                }}>
                    <div role="button" className="menu-option">
                        <div><IoEyeOutline /></div>
                        <span>Ver calificaciones</span>
                    </div>
                </Link>
            </HasPermission>
        </If>*/}
        <If condition={rowData.status === AssessmentStatusOptions.PUBLISHED}>
            <HasPermission permission={Permissions.ASSESSMENT_SET_STATUS}>
                <div role="button" className="menu-option" onClick={() => onUpdateStatus(rowData)}>
                    <div><IoEyeOutline /></div>
                    <span>Iniciar evaluación</span>
                </div>
            </HasPermission>
        </If>
            <If condition={rowData.status === AssessmentStatusOptions.STARTED}>
                <HasPermission permission={Permissions.ASSESSMENT_SET_STATUS}>
                    <div role="button" className="menu-option" onClick={() => onUpdateStatus(rowData)}>
                    <div><IoEyeOutline /></div>
                    <span>Finalizar evaluación</span>
                </div>
            </HasPermission>
        </If>
        <If condition={rowData.status === AssessmentStatusOptions.STARTED && rowData.flag !== true}>
            <HasPermission permission={Permissions.ASSESSMENT_START}>
                <Link to={`/assessment-visualizer/${rowData.id}`} state={{
                    assessmentId: rowData.id,
                    status: rowData.status,
                    flag: rowData.flag,
                    subtitle: rowData.name
                }}>
                    <div role="button" className="menu-option">
                        <div><IoEyeOutline /></div>
                        <span>Realizar evaluación</span>
                    </div>
                </Link>
            </HasPermission>
        </If>
        <If condition={rowData.status === AssessmentStatusOptions.DRAFT}>
            <HasPermission permission={Permissions.ASSESSMENT_DESIGN}>
                <Link to={`/assessment-creator/${rowData.id}`}>
                    <div role="button" className="menu-option">
                        <div><IoCreateOutline /></div>
                        <span>Diseñar evaluación</span>
                    </div>
                </Link>
            </HasPermission>
        </If>
        <If condition={rowData.status === AssessmentStatusOptions.DRAFT}>
            <HasPermission permission={Permissions.ASSESSMENT_EDIT}>
                <div role="button" className="menu-option text-secondary-dark" onClick={() => onEdit(rowData)}>
                    <div><IoPencilOutline /></div>
                    <span>Editar</span>
                </div>
            </HasPermission>
        </If>
        <If condition={rowData.status === AssessmentStatusOptions.DRAFT || rowData.status === AssessmentStatusOptions.PUBLISHED}>
            <HasPermission permission={Permissions.ASSESSMENT_DELETE}>
                <div role="button" className="menu-option text-error" onClick={() => onDelete(rowData.id!)}>
                    <div><IoTrashOutline /></div>
                    <span>Eliminar</span>
                </div>
            </HasPermission>
        </If>
    </>
);

export default AssessmentsMenuOptions;
