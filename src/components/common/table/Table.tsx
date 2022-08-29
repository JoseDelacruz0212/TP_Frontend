import React, {useState} from "react";

import {IoFilterCircle, IoFilterCircleOutline} from "react-icons/io5";

import {
    FaAngleDoubleLeft,
    FaAngleDoubleRight,
    FaAngleDown,
    FaAngleLeft,
    FaAngleRight
} from "react-icons/fa";

import { FilterSchema } from "./filter-renderer/Filter";
import FilterRenderer from "./filter-renderer/FilterRenderer";

export type PageSizeOption = {
    key: number | string;
    value: number;
}

export type Column = {
    key: number | string;
    label: React.ReactNode;
}

export type RowValue = {
    key: number | string;
    value: React.ReactNode;
}

export type Row = {
    key: number | string;
    rowValues: RowValue[];
}

interface TableProps {
    title: string;
    columns: Column[];
    rows: Row[];
    onPageChange: (direction: -2 | -1 | 1 | 2) => void;
    pageSizeOptions?: PageSizeOption[];
    onPageSizeChanged: (pageSize: number) => void;
    filterSchemas: FilterSchema[];
    pageSize: number;
    currentPage: number;
    totalItems: number;
    onClick?: (id: number | string) => void;
    onFiltersClosed?: () => void;
}

const Table = ({
    title,
    columns,
    rows,
    onPageChange,
    pageSizeOptions,
    onPageSizeChanged,
    filterSchemas,
    pageSize,
    currentPage,
    totalItems,
    onClick,
    onFiltersClosed
}: TableProps) => {
    const [filtersOpen, setFiltersOpen] = useState(false);

    const onPageSizeChangedHandler = (e: React.ChangeEvent<HTMLSelectElement>) =>
        onPageSizeChanged(parseInt(e.target.value));

    const openFilters = () =>{
        if (filtersOpen) {
            onFiltersClosed && onFiltersClosed();
        }

        setFiltersOpen(!filtersOpen);
    }

    return (
        <div className="bg-surface shadow flex flex-col space-y-7">
            <div className="flex justify-between p-4 pb-0">
                <small className="subtitle">{title}</small>
                <div role="button" className="flex items-center justify-end space-x-2" onClick={openFilters}>
                    { !filtersOpen && <IoFilterCircleOutline /> }
                    { filtersOpen && <IoFilterCircle /> }
                    <small>Filtros</small>
                </div>
            </div>
            {
                filtersOpen &&
                    <div className="px-4">
                        <FilterRenderer schemas={filterSchemas} />
                    </div>
            }
            <div className="p-4 pt-0">
                <table className="w-full">
                    <thead className="text-left">
                        <tr className="border-b">
                            {
                                columns.map(column => (
                                    <th key={column.key} className="px-5">
                                        <span className="subtitle-sm text-gray-500">{column.label}</span>
                                    </th>
                                ))
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {
                            rows.length === 0 ?
                                <tr>
                                    <td colSpan={columns.length} className="py-4">
                                        <small className="flex justify-center">No se encontraton datos</small>
                                    </td>
                                </tr>
                                :
                                rows.map(row => (
                                    <tr key={row.key} className={onClick ? 'hover:bg-gray-100 hover:cursor-pointer' : ''} onClick={() => onClick && onClick(row.key)}>
                                        {
                                            row.rowValues.map(value => (
                                                <td key={value.key} className="px-5">
                                                    {value.value}
                                                </td>
                                            ))
                                        }
                                    </tr>
                                ))
                        }
                    </tbody>
                </table>
                <footer>
                    <div className="border-t">
                        <div className="flex flex-col items-end space-x-10 space-y-1 sm:flex-row sm:justify-end pt-5">
                            <small className="flex items-center text-gray-500 space-x-3">
                                <span>Filas por página</span>
                                <div className="relative">
                                    <select className="appearance-none w-12 px-2 border" value={pageSize} onChange={onPageSizeChangedHandler}>
                                        {
                                            (pageSizeOptions || [{
                                                key: 1,
                                                value: 5
                                            }, {
                                                key: 2,
                                                value: 10
                                            }, {
                                                key: 3,
                                                value: 25
                                            }, {
                                                key: 4,
                                                value: 50
                                            }]).map(option => (
                                                <option key={option.key}>
                                                    {option.value}
                                                </option>
                                            ))
                                        }
                                    </select>
                                    <FaAngleDown size={13} className="absolute top-1 right-1 pointer-events-none" />
                                </div>
                            </small>
                            <small className="flex items-center text-gray-500 space-x-3 pt-3 sm:pt-0">
                                <span>{(currentPage - 1) * pageSize + 1} - {currentPage * pageSize} de {totalItems}</span>
                                <div className="flex space-x-2">
                                    <FaAngleDoubleLeft role="button" size={18} onClick={() => onPageChange(-2)} />
                                    <FaAngleLeft role="button" size={18} onClick={() => onPageChange(-1)} />
                                    <FaAngleRight role="button" size={18} onClick={() => onPageChange(1)} />
                                    <FaAngleDoubleRight role="button" size={18} onClick={() => onPageChange(2)} />
                                </div>
                            </small>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
};

export default Table;
