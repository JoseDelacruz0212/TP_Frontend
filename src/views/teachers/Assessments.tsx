import React from "react";
import moment from "moment";
import {useNavigate} from "react-router-dom";

import Table, {Column, Row, RowValue} from "../../components/common/table/Table";
import {FilterSchema} from "../../components/common/table/filter-renderer/Filter";

import Text from "../../components/common/table/filter-renderer/elements/Text";
import DatePicker from "../../components/common/table/filter-renderer/elements/DatePicker";
import Chip from "../../components/common/chip/Chip";

const Courses = () => {
    const navigate = useNavigate();

    const filterSchemas: FilterSchema[] = [
        {
            id: "assessment-name-filter",
            type: Text,
            onChange: (value: string) => console.log(value),
            withLabel: true,
            label: 'Nombre',
            placeholder: 'Nombre'
        },
        {
            id: "course-name-filter",
            type: Text,
            onChange: (value: string) => console.log(value),
            withLabel: true,
            label: 'Curso',
            placeholder: 'Curso'
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
        <div className="flex flex-col space-y-5">
            <div className="flex justify-end">
                <button className="px-4 py-1 shadow rounded-md" onClick={() => navigate('/assessment-creator')}>
                    + Crear evaluación
                </button>
            </div>
            <Table title="Lista de evaluaciones"
                   columns={columns}
                   rows={rows}
                   onPageChange={(a) => console.log(a)}
                   onPageSizeChanged={(a) => console.log(a)}
                   filterSchemas={filterSchemas}
                   pageSize={25}
                   startIndex={1}
                   endIndex={25}
                   onClick={(key) => navigate('/assessment-creator')} />
        </div>
    );
};

const columns: Column[] = [
    {
        key: 1,
        label: 'Nombre'
    },
    {
        key: 2,
        label: 'Curso'
    },
    {
        key: 3,
        label: 'Duración'
    },
    {
        key: 4,
        label: ''
    }
];

const rows = [
    {
        id: 1,
        name: 'Práctica calificada 1',
        course: 'Matemática',
        startDate: new Date(2022, 4, 20, 20),
        endDate: new Date(2022, 4, 26, 22, 50),
        status: 0,
    },
    {
        id: 2,
        name: 'Práctica calificada 2',
        course: 'Matemática',
        startDate: new Date(2022, 5, 20, 20),
        endDate: new Date(2022, 5, 26, 22, 50),
        status: 1
    }
].map(item => {
    const result: Row = {
        key: item.id,
        rowValues: Object.keys(item).reduce<RowValue[]>((acc: RowValue[], current: string) => {
            let value: React.ReactNode = null;

            switch (current) {
                case 'name': value = item['name']; break;
                case 'course': value = item['course']; break;
                case 'endDate': value = `Desde ${moment(item['startDate']).format('LLL')} a ${moment(item['endDate']).format('LLL')}`; break;
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
        key: 4,
        value: (
            <div className="flex justify-end space-x-4">
                { item.status === 0 && <Chip label="No iniciada" className="bg-yellow-400 text-black w-32 text-center" /> }
                { item.status === 1 && <Chip label="Iniciada" className="bg-green-500 text-white w-32 text-center" /> }
            </div>
        )
    });

    return result;
});

export default Courses;
