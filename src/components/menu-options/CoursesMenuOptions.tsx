import React from "react";
import HasPermission from "../../hoc/with-permission/HasPermission";
import {Permissions} from "../../types/auth";
import {Link} from "react-router-dom";
import {IoBarChartOutline, IoDocumentOutline, IoPencilOutline, IoPeopleOutline, IoTrashOutline} from "react-icons/io5";
import {Course} from "../../types/communication/responses/courses";

interface CoursesMenuOptionsProps {
    rowData: Course;
    onEdit: (x: Course) => void;
    onDelete: (x: string) => void;
}

const CoursesMenuOptions = ({ rowData, onEdit, onDelete }: CoursesMenuOptionsProps) => (
    <>
        <HasPermission permission={Permissions.COURSES_ASSESSMENTS}>
            <Link to="/assessments" state={{ courseId: rowData.id!, subtitle: rowData.name }}>
                <div role="button" className="menu-option">
                    <div><IoDocumentOutline /></div>
                    <span>Ver evaluaciones</span>
                </div>
            </Link>
        </HasPermission>
        <HasPermission permission={Permissions.COURSES_USERS}>
            <Link to="/users" state={{ courseId: rowData.id!, subtitle: rowData.name }}>
                <div role="button" className="menu-option">
                    <div><IoPeopleOutline /></div>
                    <span>Ver usuarios</span>
                </div>
            </Link>
        </HasPermission>
        <HasPermission permission={Permissions.COURSES_OBJECTIVES}>
            <div role="button" className="menu-option">
                <div><IoBarChartOutline /></div>
                <span>Ver objetivos</span>
            </div>
        </HasPermission>
        <HasPermission permission={Permissions.COURSES_EDIT}>
            <div role="button" className="menu-option text-secondary-dark" onClick={() => onEdit(rowData)}>
                <div><IoPencilOutline /></div>
                <span>Editar</span>
            </div>
        </HasPermission>
        <HasPermission permission={Permissions.COURSES_DELETE}>
            <div role="button" className="menu-option text-error" onClick={() => onDelete(rowData.id!)}>
                <div><IoTrashOutline /></div>
                <span>Eliminar</span>
            </div>
        </HasPermission>
    </>
);

export default CoursesMenuOptions;
