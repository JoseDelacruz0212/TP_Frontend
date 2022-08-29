import React, {useEffect} from "react";
import moment from "moment";

import Table from "../../components/common/table/Table";
import {FilterSchema} from "../../components/common/table/filter-renderer/Filter";

import Text from "../../components/common/table/filter-renderer/elements/Text";
import DatePicker from "../../components/common/table/filter-renderer/elements/DatePicker";
import Chip from "../../components/common/chip/Chip";
import Select from "../../components/common/table/filter-renderer/elements/Select";

import useTable, {Convertor} from "../../hooks/useTable";

import {useAppDispatch, useAppSelector} from "../../redux/store";
import {getAllAssessments, updateFilters, updatePage, resetFilters, updatePageSize} from "../../redux/async/assessments";
import {useLocation, useNavigate} from "react-router-dom";

interface LocationState {
    courseId?: string;
}

const Assessments = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const state = location.state as LocationState;
    const courseId = state?.courseId;

    const dispatch = useAppDispatch();
    const { filteredAssessments: assessments, filters, pagination } = useAppSelector(state => state.assessments);
    const { tableColumns, tableData } = useTable(convertor, columns, assessments);

    useEffect(() => {
        dispatch(getAllAssessments(courseId));
    }, [dispatch]);

    const filterSchemas: FilterSchema[] = [
        {
            id: "assessment-name-filter",
            type: Text,
            onChange: (value: string) => dispatch(updateFilters({ ...filters, name: value })),
            initialValue: filters.name,
            withLabel: true,
            label: 'Nombre',
            placeholder: 'Nombre'
        },
        {
            id: "course-id-filter",
            type: Select,
            onChange: (value: string) => dispatch(updateFilters({ ...filters, courseId: value })),
            initialValue: filters.courseId,
            withLabel: true,
            label: 'Curso',
            placeholder: 'Curso'
        },
        {
            id: "course-start-date-filter",
            type: DatePicker,
            onChange: (value: string) => dispatch(updateFilters({ ...filters, startDate: value })),
            initialValue: filters.startDate,
            withLabel: true,
            label: 'Fecha de inicio',
            placeholder: 'Fecha de inicio',
        },
        {
            id: "course-end-date-filter",
            type: DatePicker,
            onChange: (value: string) => dispatch(updateFilters({ ...filters, endDate: value })),
            initialValue: filters.endDate,
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
                   totalItems={pagination.totalItems}
                   onClick={(key) => navigate('/assessment-creator')} />
        </div>
    );
};

const columns = ["Nombre", "Curso", "Duración", ""];

const convertor: Convertor<any> = (column, rowData) => {
    let value: React.ReactNode = null;

    switch (column) {
        case 1: value = <div className="py-4">{rowData.name}</div>; break;
        case 2: value = <div className="py-4">{rowData.courseName}</div>; break;
        case 3: value = <div className="py-4">{`Desde ${moment(rowData.startDate).format('LL')} a ${moment(rowData.endDate).format('LL')}`}</div>; break;
        case 4: value = (
                <div className="flex justify-end space-x-4">
                    { rowData.status === 1 && <Chip label="No iniciada" className="bg-yellow-400 text-black w-32 text-center" /> }
                    { rowData.status === 2 && <Chip label="Iniciada" className="bg-green-500 text-white w-32 text-center" /> }
                    { rowData.status === 3 && <Chip label="Borrador" className="bg-red-400 text-white w-32 text-center" /> }
                </div>
            );
            break;
    };

    return value;
};

export default Assessments;
