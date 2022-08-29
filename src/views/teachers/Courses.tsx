import React, {useEffect} from "react";

import Table from "../../components/common/table/Table";
import {FilterSchema} from "../../components/common/table/filter-renderer/Filter";

import Text from "../../components/common/table/filter-renderer/elements/Text";
import DatePicker from "../../components/common/table/filter-renderer/elements/DatePicker";

import useTable, {Convertor} from "../../hooks/useTable";

import {useAppDispatch, useAppSelector} from "../../redux/store";
import {getAllCourses} from "../../redux/async/courses";
import {filtersUpdated} from "../../redux/slices/courses";

const Courses = () => {
    const dispatch = useAppDispatch();
    const { courses, filters } = useAppSelector(state => state.courses);
    const { tableColumns, tableData } = useTable(convertor, columns, courses);

    useEffect(() => {
        dispatch(getAllCourses());
    }, [dispatch]);

    const filterSchemas: FilterSchema[] = [
        {
            id: "course-name-filter",
            type: Text,
            onChange: (value: string) => dispatch(filtersUpdated({ ...filters, name: value })),
            withLabel: true,
            label: 'Nombre',
            placeholder: 'Nombre'
        },
        {
            id: "course-start-date-filter",
            type: DatePicker,
            onChange: (value: string) => dispatch(filtersUpdated({ ...filters, startDate: new Date(value) })),
            withLabel: true,
            label: 'Fecha de inicio',
            placeholder: 'Fecha de inicio',
            startDate: new Date()
        },
        {
            id: "course-end-date-filter",
            type: DatePicker,
            onChange: (value: string) => dispatch(filtersUpdated({ ...filters, endDate: new Date(value) })),
            withLabel: true,
            label: 'Fecha de fin',
            placeholder: 'Fecha de fin',
        }
    ];

    return (
        <div>
            <Table title="Lista de cursos"
                   columns={tableColumns}
                   rows={tableData}
                   onPageChange={(a) => console.log(a)}
                   onPageSizeChanged={(a) => console.log(a)}
                   filterSchemas={filterSchemas}
                   pageSize={25}
                   startIndex={1}
                   endIndex={25} />
        </div>
    );
};

const columns = ["Nombre", "Duración", ""];

const convertor: Convertor<any> = (column, rowData) => {
    let value: React.ReactNode = null;

    switch (column) {
        case 1: value = <div className="py-4">{rowData.name}</div>; break;
        case 2: value = <div className="py-4">2</div>; break;
        case 3: value = <div className="flex justify-end space-x-4">Actions</div>; break;
    };

    return value;
};

export default Courses;
