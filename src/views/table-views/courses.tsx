import React from "react";
import moment from "moment/moment";

import {ConvertorCreator} from "../../types/hooks/table";
import {CourseFilter} from "../../types/communication/requests/course";
import {Course} from "../../types/communication/responses/courses";
import {Permissions} from "../../types/app/auth";

import CourseService from "../../services/CourseService";

import Text from "../../components/common/table/filter-renderer/elements/Text";
import CourseEditForm from "../../components/edit-forms/CoursesEditForm";
import MenuOptions from "../../components/common/menu/MenuOptions";
import withPermission from "../../components/hoc/withPermission";

import {withCoursesProvider} from "../../redux/providers/providers";

import TableView from "../layouts/TableView";
import {IoDocumentOutline, IoPencilOutline, IoPeopleOutline, IoTrashOutline} from "react-icons/io5";
import {Entity} from "../../types/communication/responses/entity";

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
          <div className="flex justify-end px-5">
              <MenuOptions options={getMenuOptions<Course>(onEdit, onDelete, rowData)} />
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

const getMenuOptions = <T extends Entity>(onEdit: (x: T) => void, onDelete: (x: string) => void, rowData: T) => [
    <div role="button" className="menu-option">
        <div><IoPeopleOutline /></div>
        <span>Ver usuarios</span>
    </div>,
    <div role="button" className="menu-option">
        <div><IoDocumentOutline /></div>
        <span>Ver evaluaciones</span>
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

export default withPermission(withCoursesProvider(Courses), Permissions.COURSES);
