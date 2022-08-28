import React from "react";

import Table from "../../components/common/table/Table";
import {FilterSchema} from "../../components/common/table/filter-renderer/Filter";

import Text from "../../components/common/table/filter-renderer/elements/Text";
import DatePicker from "../../components/common/table/filter-renderer/elements/DatePicker";

import useTable, {Convertor} from "../../hooks/useTable";

const Courses = () => {
    const { tableColumns, tableData } = useTable(convertor, columns, rows);

    const filterSchemas: FilterSchema[] = [
        {
            id: "course-name-filter",
            type: Text,
            onChange: (value: string) => console.log(value),
            withLabel: true,
            label: 'Nombre',
            placeholder: 'Nombre'
        },
        {
            id: "course-start-date-filter",
            type: DatePicker,
            onChange: (value: string) => console.log(value),
            withLabel: true,
            label: 'Fecha de inicio',
            placeholder: 'Fecha de inicio',
            startDate: new Date()
        },
        {
            id: "course-end-date-filter",
            type: DatePicker,
            onChange: (value: string) => console.log(value),
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

const rows = [
    {
        id: 1,
        name: 'Matemática',
        startDate: new Date(2022, 4, 20),
        endDate: new Date(2022, 4, 26)
    },
    {
        id: 2,
        name: 'Química',
        startDate: new Date(2022, 5, 20),
        endDate: new Date(2022, 5, 26)
    }
];

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
