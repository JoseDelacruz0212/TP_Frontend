import React, {useState} from "react";

import {IoFilterCircle, IoFilterCircleOutline} from "react-icons/io5";

import {
    FaAngleDoubleLeft,
    FaAngleDoubleRight,
    FaAngleDown,
    FaAngleLeft,
    FaAngleRight
} from "react-icons/fa";

import FilterRenderer from "./filter-renderer/FilterRenderer";

import {TableProps} from "../../../types/components/common/table/table";

const Table = ({
    title,
    columns,
    rows,
    onPageChange,
    pageSizeOptions,
    onPageSizeChanged,
    filterSchemas,
    pageSize = 1,
    currentPage = 1,
    totalItems = 0,
    hasNext = true,
    hasPrev = true,
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
                {
                    filterSchemas.length > 0 &&
                    <div role="button" className="flex items-center justify-end space-x-2" onClick={openFilters}>
                        { !filtersOpen && <IoFilterCircleOutline /> }
                        { filtersOpen && <IoFilterCircle /> }
                        <small>Filtros</small>
                    </div>
                }
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
                                    <FaAngleDoubleLeft className={`${!hasPrev ? 'cursor-not-allowed' : ''}`} role="button" size={18} onClick={() => hasPrev && onPageChange(-2)} />
                                    <FaAngleLeft className={`${!hasPrev ? 'cursor-not-allowed' : ''}`} role="button" size={18} onClick={() => hasPrev && onPageChange(-1)} />
                                    <FaAngleRight className={`${!hasNext ? 'cursor-not-allowed' : ''}`} role="button" size={18} onClick={() => hasNext && onPageChange(1)} />
                                    <FaAngleDoubleRight className={`${!hasNext ? 'cursor-not-allowed' : ''}`} role="button" size={18} onClick={() => hasNext && onPageChange(2)} />
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
