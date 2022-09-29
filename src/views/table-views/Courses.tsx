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
import validationSchema from "../../validations/edit-forms/courses-edit-form-validation";
import Select from "../../components/common/table/filter-renderer/elements/Select";

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
                       updateValidationSchema={validationSchema}
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
        id: "course-code-filter",
        type: Text,
        initialValue: filters.code,
        onChange: (value: string) => onFiltersUpdate({ ...filters, code: value }),
        withLabel: true,
        label: 'Código',
        placeholder: 'Código'
    },
    {
        id: "course-grade-filter",
        type: Select,
        initialValue: filters.grade,
        onChange: (value: string) => onFiltersUpdate({ ...filters, grade: value }),
        withLabel: true,
        label: 'Grado',
        placeholder: 'Grado',
        options: [
            { value: '1 primaria', label: '1 primaria' },
            { value: '2 primaria', label: '2 primaria' },
            { value: '3 primaria', label: '3 primaria' },
            { value: '4 primaria', label: '4 primaria' },
            { value: '5 primaria', label: '5 primaria' },
            { value: '6 primaria', label: '6 primaria' },
            { value: '1 secundaria', label: '1 secundaria' },
            { value: '2 secundaria', label: '2 secundaria' },
            { value: '3 secundaria', label: '3 secundaria' },
            { value: '4 secundaria', label: '4 secundaria' },
            { value: '5 secundaria', label: '5 secundaria' }
        ]
    },
    {
        id: "course-section-filter",
        type: Select,
        initialValue: filters.section,
        onChange: (value: string) => onFiltersUpdate({ ...filters, section: value }),
        withLabel: true,
        label: 'Sección',
        placeholder: 'Sección',
        options: [
            { value: 'A', label: 'A' },
            { value: 'B', label: 'B' },
            { value: 'C', label: 'C' },
            { value: 'D', label: 'D' }
        ]
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
