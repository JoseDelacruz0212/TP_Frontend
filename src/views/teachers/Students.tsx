import React from "react";
import moment from "moment";
import {Link} from "react-router-dom";

import Table, {Column, Row, RowValue} from "../../components/common/table/Table";
import {FilterSchema} from "../../components/common/table/filter-renderer/Filter";

import Text from "../../components/common/table/filter-renderer/elements/Text";
import DatePicker from "../../components/common/table/filter-renderer/elements/DatePicker";
import Chip from "../../components/common/chip/Chip";

const Courses = () => {
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
                   columns={columns}
                   rows={rows}
                   onPageChange={(a) => console.log(a)}
                   onPageSizeChanged={(a) => console.log(a)}
                   filterSchemas={filterSchemas}
                   pageSize={25}
                   startIndex={1}
                   endIndex={25} />
        </div>
    );
};

const columns: Column[] = [
    {
        key: 1,
        label: 'Nombres'
    },
    {
        key: 2,
        label: 'Apellidos'
    },
    {
        key: 3,
        label: ''
    }
];

const rows = [
    { 
        id: 1,
        name: 'Rodrigo',
        lastname: 'Silva',
        startDate: new Date(2022, 4, 20),
        endDate: new Date(2022, 4, 26)
    },
    {
        id: 2,
        name: 'Josè',
        lastname: 'De la cruz',
        startDate: new Date(2022, 5, 20),
        endDate: new Date(2022, 5, 26)
    }
].map(item => {
    const result: Row = {
        key: item.id,
        rowValues: Object.keys(item).reduce<RowValue[]>((acc: RowValue[], current: string) => {
            let value: React.ReactNode = null;

            switch (current) {
                case 'name': value = item['name']; break;
                case 'endDate': value = `Desde ${moment(item['startDate']).format('LL')} a ${moment(item['endDate']).format('LL')}`; break;
            }

            if (value != null) {
                value = <div className="py-4">{value}</div>
                const result: RowValue = {key: acc.length === 0 ? 1 : +acc[acc.length - 1].key + 1, value}
                return [...acc, result];
            } else {
                return acc;
            }
        }, [])
    };

    result.rowValues.push({
        key: 3,
        value: (
            <div className="flex justify-end space-x-4">
                <Link to="/students">
                    <Chip label="Estudiantes" className="bg-secondary text-on-secondary hover:bg-secondary-dark" />
                </Link>
                <Link to="/assessments">
                    <Chip label="Evaluaciones" className="bg-secondary text-on-secondary hover:bg-secondary-dark" />
                </Link>
            </div>
        )
    });

    return result;
});

export default Courses;
