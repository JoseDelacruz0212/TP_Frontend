import React from "react";
import moment from "moment/moment";

import {CourseFilter} from "../../types/communication/requests/course";
import {Course} from "../../types/communication/responses/courses";
import {Permissions} from "../../types/auth";

import CourseService from "../../services/CourseService";

import Text from "../../components/common/table/filter-renderer/elements/Text";
import CourseEditForm from "../../containers/edit-forms/CoursesEditForm";
import MenuOptions from "../../components/common/menu/MenuOptions";
import withPermission from "../../hoc/with-permission/withPermission";
import HasPermission from "../../hoc/with-permission/HasPermission";

import {withCoursesProvider} from "../../redux/providers/providers";

import TableView from "../layouts/TableView";
import {
    IoBarChartOutline,
    IoDocumentOutline,
    IoPencilOutline,
    IoPeopleOutline,
    IoTrashOutline
} from "react-icons/io5";
import {Link} from "react-router-dom";
import {ConvertorCreator, FilterSchemaCreator, MenuOptionsCreator} from "../../types/common";

const defaultCourses: Course = {
    name: '',
    description: '',
    institutionId: ''
};

const Courses = () => {
  const convertorCreator : ConvertorCreator<Course> = (onEdit, onDelete) => (column, rowData) => {
    let value: React.ReactNode = null;

    switch (column) {
      case 1: value = <div className="py-4">{rowData.name}</div>; break;
      case 2: value = <div className="py-4">{rowData.description}</div>; break;
      case 3: value = <div className="py-4">{rowData.institution?.name}</div>; break;
      case 4: value = <div className="py-4">{rowData.createdBy}</div>; break;
      case 5: value = <div className="py-4">{moment(rowData.createdOn).format('LLL')}</div>; break;
      case 6: value = (
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
            <TableView title="Lista de cursos"
                       filterSchemaCreator={createFilterSchema}
                       convertorCreator={convertorCreator}
                       columns={columns}
                       service={CourseService}
                       sidePanelId="edit-course-side-panel"
                       sidePanelEditTitle="Editar curso"
                       sidePanelCreateTitle="Agregar curso"
                       formInputs={CourseEditForm}
                       defaultItemSchema={defaultCourses}
                       addButtonText="Crear curso"
                       canAddPermission={Permissions.COURSES_ADD} />
        </div>
    )
}

const getMenuOptions: MenuOptionsCreator<Course> = (onEdit, onDelete, rowData) => [
    <HasPermission permission={Permissions.COURSES_ASSESSMENTS}>
        <Link to="/assessments" state={{ courseId: rowData.id!, subtitle: rowData.name }}>
            <div role="button" className="menu-option">
                <div><IoDocumentOutline /></div>
                <span>Ver evaluaciones</span>
            </div>
        </Link>
    </HasPermission>,
    <HasPermission permission={Permissions.COURSES_USERS}>
        <Link to="/users" state={{ courseId: rowData.id!, subtitle: rowData.name }}>
            <div role="button" className="menu-option">
                <div><IoPeopleOutline /></div>
                <span>Ver usuarios</span>
            </div>
        </Link>
    </HasPermission>,
    <HasPermission permission={Permissions.COURSES_OBJECTIVES}>
        <div role="button" className="menu-option">
            <div><IoBarChartOutline /></div>
            <span>Ver objetivos</span>
        </div>
    </HasPermission>,
    <HasPermission permission={Permissions.COURSES_EDIT}>
        <div role="button" className="menu-option text-secondary-dark" onClick={() => onEdit(rowData)}>
            <div><IoPencilOutline /></div>
            <span>Editar</span>
        </div>
    </HasPermission>,
    <HasPermission permission={Permissions.COURSES_DELETE}>
        <div role="button" className="menu-option text-error" onClick={() => onDelete(rowData.id!)}>
            <div><IoTrashOutline /></div>
            <span>Eliminar</span>
        </div>
    </HasPermission>
];

const createFilterSchema: FilterSchemaCreator<CourseFilter> = (filters, onFiltersUpdate) => ([
    {
        id: "course-name-filter",
        type: Text,
        initialValue: filters.name,
        onChange: (value: string) => onFiltersUpdate({ ...filters, name: value }),
        withLabel: true,
        label: 'Nombre',
        placeholder: 'Nombre'
    },
    {
        id: "course-institution-filter",
        type: Text,
        initialValue: filters.institution,
        onChange: (value: string) => onFiltersUpdate({ ...filters, institution: value }),
        withLabel: true,
        label: 'Institución',
        placeholder: 'Institución'
    }
])

const columns = ["Nombre", "Descripción", "Institution", "Creado por", "Fecha de creación", ""];;

export default withPermission(withCoursesProvider(Courses), Permissions.COURSES);
