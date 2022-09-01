import ICourses from '../../types/communication/responses/courses';
import {ConvertorCreator} from "../../types/hooks/table";
import React from "react";
import CourseActions from "../../components/courses/CoursesActions";
import TableView from "../layouts/TableView";
import {CourseFilter} from "../../types/communication/requests/course";
import Text from "../../components/common/table/filter-renderer/elements/Text";
import CourseService from "../../services/CourseService";
import CourseEditForm from "../../components/courses/CoursesEditForm";
import {withCoursesProvider} from "../../redux/providers/providers";
const defaultCourses: ICourses = {
  name: '',
  description: '',
  institution: '',
  createdAt:new Date(),
  updatedAt: new Date(),
  createdBy: '',
  updatedBy:'',
};

const Courses = () => {
  const convertorCreator : ConvertorCreator<ICourses> = (onEdit, onDelete) => (column, rowData) => {
    let value: React.ReactNode = null;

    switch (column) {
      case 1: value = <div className="py-4">{rowData.name}</div>; break;
      case 2: value = <div className="py-4">{rowData.description}</div>; break;
      case 3: value = <div className="py-4">{rowData.institution}</div>; break;
      case 4: value = <div className="py-4">{rowData.createdAt.toDateString()}</div>; break;
      case 5: value = <div className="py-4">{rowData.createdBy}</div>; break;
      case 6: value = <div className="py-4">{rowData.updatedAt.toDateString()}</div>; break;
      case 7: value = <div className="py-4">{rowData.updatedBy}</div>; break;
      case 8: value = (
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
        id: "institution-name-filter",
        type: Text,
        initialValue: filters.name,
        onChange: (value: string) => onFiltersUpdate({ ...filters, name: value }),
        withLabel: true,
        label: 'Nombre',
        placeholder: 'Nombre'
    },
    {
        id: "institution-intitution-filter",
        type: Text,
        initialValue: filters.institution,
        onChange: (value: string) => onFiltersUpdate({ ...filters, institution: value }),
        withLabel: true,
        label: 'Intitución',
        placeholder: 'Intitución'
    },
])

const columns = ["Nombre", "Descripción", "Institución",  "Fecha de creación","Creado por",  "Fecha de actualización", "Actualizado por", ""];

export default withCoursesProvider(Courses)
