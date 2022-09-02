import React from "react";
import moment from "moment/moment";

import {ConvertorCreator} from "../../types/hooks/table";
import {CourseFilter} from "../../types/communication/requests/course";
import {Course} from "../../types/communication/responses/courses";
import {Permissions} from "../../types/app/auth";

import CourseService from "../../services/CourseService";

import Text from "../../components/common/table/filter-renderer/elements/Text";
import CourseEditForm from "../../components/courses/CoursesEditForm";
import CourseActions from "../../components/courses/CoursesActions";

import {withCoursesProvider} from "../../redux/providers/providers";

import withPermission from "../../components/hoc/withPermission";

import TableView from "../layouts/TableView";

const defaultCourses: Course = {
  name: '',
  description: '',
};

const Courses = () => {
  const convertorCreator : ConvertorCreator<Course> = (onEdit, onDelete) => (column, rowData) => {
    let value: React.ReactNode = null;

    switch (column) {
      case 1: value = <div className="py-4">{rowData.name}</div>; break;
      case 2: value = <div className="py-4">{rowData.description}</div>; break;
      case 3: value = <div className="py-4">{rowData.createdBy}</div>; break;
      case 4: value = <div className="py-4">{moment(rowData.createdOn).format('LLL')}</div>; break;
      case 5: value = (
          <div className="flex justify-end">
            <CourseActions onEdit={() => onEdit(rowData) }
                           onDelete={() => onDelete(rowData.id as string)} />
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
                       addButtonText="Crear curso" />
        </div>
    )
}

const createFilterSchema = (filters: CourseFilter, onFiltersUpdate: (x: CourseFilter) => any) => ([
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

const columns = ["Nombre", "Descripción", "Creado por", "Fecha de creación", ""];

export default withPermission(withCoursesProvider(Courses), Permissions.COURSES);
