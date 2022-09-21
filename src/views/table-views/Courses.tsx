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

import {withCoursesProvider} from "../../redux/providers/providers";

import TableView from "../layouts/TableView";

import {ConvertorCreator, FilterSchemaCreator} from "../../types/common";
import CoursesMenuOptions from "../../components/menu-options/CoursesMenuOptions";
import validationSchema from "../../containers/edit-forms/validations/courses-edit-form-validation";

const defaultCourses: Course = {
    name: '',
    description: '',
    code: '',
    grade: '',
    section: '',
    institutionId: ''
};

const Courses = () => {
  const convertorCreator : ConvertorCreator<Course> = (onEdit, onDelete) => (column, rowData) => {
    let value: React.ReactNode = null;

    switch (column) {
      case 1: value = <div className="py-4">{rowData.name}</div>; break;
      case 2: value = <div className="py-4">{rowData.code}</div>; break;
      case 3: value = <div className="py-4">{rowData.description}</div>; break;
      case 4: value = <div className="py-4">{rowData.grade}</div>; break;
      case 5: value = <div className="py-4">{rowData.section}</div>; break;
      case 6: value = <div className="py-4">{rowData.institution?.name}</div>; break;
      case 7: value = <div className="py-4">{rowData.createdBy}</div>; break;
      case 8: value = <div className="py-4">{moment(rowData.createdOn).format('LLL')}</div>; break;
      case 9: value = (
            <div className="flex justify-end px-5">
              <MenuOptions>
                  <CoursesMenuOptions rowData={rowData} onEdit={onEdit} onDelete={onDelete} />
              </MenuOptions>
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
                       formValidationSchema={validationSchema}
                       canAddPermission={Permissions.COURSES_ADD} />
        </div>
    )
}

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

const columns = ["Nombre", "Código", "Descripción", "Grado", "Sección", "Institution", "Creado por", "Fecha de creación", ""];;

export default withPermission(withCoursesProvider(Courses), Permissions.COURSES);
