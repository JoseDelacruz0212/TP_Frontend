import React, {useEffect} from "react";
import moment from "moment";

import Table from "../../components/common/table/Table";
import {FilterSchema} from "../../components/common/table/filter-renderer/Filter";

import Text from "../../components/common/table/filter-renderer/elements/Text";
import DatePicker from "../../components/common/table/filter-renderer/elements/DatePicker";

import useTable, {Convertor} from "../../hooks/useTable";

import {useAppDispatch, useAppSelector} from "../../redux/store";
import {getAllCourses, updateFilters, updatePage, resetFilters, updatePageSize} from "../../redux/async/courses";

import {Link} from "react-router-dom";
import Chip from "../../components/common/chip/Chip";

const Courses = () => {
    const dispatch = useAppDispatch();
    const { filteredCourses: courses, filters, pagination } = useAppSelector(state => state.courses);
    const { tableColumns, tableData } = useTable(convertor, columns, courses);

    useEffect(() => {
        dispatch(getAllCourses());
    }, [dispatch]);

    const filterSchemas: FilterSchema[] = [
        {
            id: "course-name-filter",
            type: Text,
            initialValue: filters.name,
            onChange: (value: string) => dispatch(updateFilters({ ...filters, name: value })),
            withLabel: true,
            label: 'Nombre',
            placeholder: 'Nombre'
        },
        {
            id: "course-start-date-filter",
            type: DatePicker,
            initialValue: filters.startDate,
            onChange: (value: string) => dispatch(updateFilters({ ...filters, startDate: value })),
            withLabel: true,
            label: 'Fecha de inicio',
            placeholder: 'Fecha de inicio',
        },
        {
            id: "course-end-date-filter",
            type: DatePicker,
            initialValue: filters.endDate,
            onChange: (value: string) => dispatch(updateFilters({ ...filters, endDate: value })),
            withLabel: true,
            label: 'Fecha de fin',
            placeholder: 'Fecha de fin',
        }
    ];

    const onFiltersClosed = () => dispatch(resetFilters());

    return (
        <div>
            <Table title="Lista de cursos"
                   columns={tableColumns}
                   rows={tableData}
                   onPageChange={(option) => dispatch(updatePage(option))}
                   onPageSizeChanged={(pageSize) => dispatch(updatePageSize(pageSize))}
                   onFiltersClosed={onFiltersClosed}
                   filterSchemas={filterSchemas}
                   pageSize={pagination.pageSize}
                   currentPage={pagination.page}
                   totalItems={pagination.totalItems} />
        </div>
    );
};

const columns = ["Nombre", "Duración", ""];

const convertor: Convertor<any> = (column, rowData) => {
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

export default Courses;
