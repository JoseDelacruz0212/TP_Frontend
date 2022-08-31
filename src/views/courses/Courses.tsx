import React  from "react";
import { Link } from "react-router-dom";
import moment from "moment";

import {Convertor} from "../../types/hooks/table";
import {Course} from "../../types/communication/responses/course";
import {CourseFilter} from "../../types/communication/requests/course";

import Text from "../../components/common/table/filter-renderer/elements/Text";
import DatePicker from "../../components/common/table/filter-renderer/elements/DatePicker";
import Chip from "../../components/common/chip/Chip";
import TableView from "../../components/common/table/TableView";

import CourseService from "../../services/CourseService";

import {withCoursesProvider} from "../../redux/providers/providers";

const Courses = () => {
    return (
        <TableView title="Lista de cursos"
                   createFilterSchema={createFilterSchema}
                   columns={columns}
                   convertor={convertor}
                   service={CourseService} />
    )
};

const createFilterSchema = (filters: CourseFilter, onFiltersUpdate: (x: CourseFilter) => any) => ([
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
        id: "course-start-date-filter",
        type: DatePicker,
        initialValue: filters.startDate,
        onChange: (value: string) => onFiltersUpdate({ ...filters, startDate: value }),
        withLabel: true,
        label: 'Fecha de inicio',
        placeholder: 'Fecha de inicio',
    },
    {
        id: "course-end-date-filter",
        type: DatePicker,
        initialValue: filters.endDate,
        onChange: (value: string) => onFiltersUpdate({ ...filters, endDate: value }),
        withLabel: true,
        label: 'Fecha de fin',
        placeholder: 'Fecha de fin',
    }
]);

const columns = ["Nombre", "Duración", ""];

const convertor: Convertor<Course> = (column, rowData) => {
    let value: React.ReactNode = null;

    switch (column) {
        case 1: value = <div className="py-4">{rowData.name}</div>; break;
        case 2: value = <div className="py-4">{`Desde ${moment(new Date(rowData.startDate)).format('LL')} a ${moment(new Date(rowData.endDate)).format('LL')}`}</div>; break;
        case 3: value = (
                <div className="flex justify-end space-x-4">
                    <Link to="/objectives">
                        <Chip label="Objetivos" className="bg-secondary text-on-secondary hover:bg-secondary-dark w-28 text-center" />
                    </Link>
                    <Link to="/students">
                        <Chip label="Estudiantes" className="bg-secondary text-on-secondary hover:bg-secondary-dark w-28 text-center" />
                    </Link>
                    <Link to="/assessments" state={{ courseId: rowData.id }}>
                        <Chip label="Evaluaciones" className="bg-secondary text-on-secondary hover:bg-secondary-dark w-28 text-center" />
                    </Link>
                </div>
            );
            break;
    };

    return value;
};

export default withCoursesProvider(Courses);
