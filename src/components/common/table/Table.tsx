import React, {useMemo, useState} from "react";
import Select from "react-select";

import {IoFilterCircle, IoFilterCircleOutline} from "react-icons/io5";

import {
    FaAngleDoubleLeft,
    FaAngleDoubleRight,
    FaAngleLeft,
    FaAngleRight
} from "react-icons/fa";

import FilterRenderer from "./filter-renderer/FilterRenderer";

import {Column, FilterSchema, Option, Row} from "../../../types/common";
import Loading from "../loading/Loading";
import useSelect from "../../../hooks/useSelect";

interface TableProps {
    title?: string;
    columns: Column[];
    rows: Row[];
    onPageChange?: (direction: -2 | -1 | 1 | 2) => void;
    pageSizeOptions?: Option[];
    onPageSizeChanged?: (pageSize: number) => void;
    filterSchemas?: FilterSchema[];
    pageSize?: number;
    hasNext?: boolean;
    hasPrev?: boolean;
    currentPage?: number;
    totalItems?: number;
    onClick?: (id: number | string) => void;
    onFiltersClosed?: () => void;
    hidePagination?: boolean;
    isLoading?: boolean;
}

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
    onFiltersClosed,
    hidePagination = false,
    isLoading = false
}: TableProps) => {
    const [filtersOpen, setFiltersOpen] = useState(false);

    const onPageSizeChangedHandler = (page?: string) =>
        page && onPageSizeChanged && onPageSizeChanged(parseInt(page));

    const openFilters = () =>{
        if (filtersOpen) {
            onFiltersClosed && onFiltersClosed();
        }

        setFiltersOpen(!filtersOpen);
    }

    const options: Option[] = useMemo(() => pageSizeOptions || [{
            value: "5",
            label: "5"
        },
        {
            value: "10",
            label: "10"
        },
        {
            value: "25",
            label: "25"
        },
        {
            value: "50",
            label: "50"
        }], [pageSizeOptions]);

    const selectProps = useSelect(onPageSizeChangedHandler, options, pageSize.toString());

    return (
        <div className="bg-surface shadow flex flex-col space-y-7">
            {
                (title || (filterSchemas && filterSchemas.length > 0)) &&
                <div className="flex justify-between p-4 pb-0">
                    { title && <small className="subtitle">{title}</small> }
                    {
                        filterSchemas && filterSchemas.length > 0 &&
                        <div role="button" className="flex items-center justify-end space-x-2" onClick={openFilters}>
                            { !filtersOpen && <IoFilterCircleOutline /> }
                            { filtersOpen && <IoFilterCircle /> }
                            <small>Filtros</small>
                        </div>
                    }
                </div>
            }
            {
                filterSchemas && filtersOpen &&
                    <div className="px-4">
                        <FilterRenderer schemas={filterSchemas} />
                    </div>
            }
            <div className="px-4 pb-0 overflow-x-auto">
                <table className="w-full">
                    <thead className="text-left">
                        <tr>
                            {
                                columns.map(column => (
                                    <th key={column.key} className="px-5">
                                        <span className="subtitle-sm text-gray-500">{column.label}</span>
                                    </th>
                                ))
                            }
                        </tr>
                    </thead>
                    <tbody className="border-y">
                        {
                            isLoading &&
                            <tr>
                                <td colSpan={columns.length} className="py-4">
                                    <Loading />
                                </td>
                            </tr>
                        }
                        {
                            rows.length === 0 && !isLoading ?
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
            </div>
            <footer className="p-4 pt-0">
                {
                    !hidePagination &&
                    <div className="flex flex-col items-end space-x-10 space-y-1 sm:flex-row sm:justify-end sm:items-center">
                        <small className="flex items-center text-gray-500 space-x-3">
                            <span>Filas por p??gina</span>
                            <Select {...selectProps} styles={{
                                ...selectProps.styles,
                                indicatorSeparator: () => ({})
                            }} />
                        </small>
                        <small className="flex items-center text-gray-500 space-x-3">
                            <span>{(currentPage - 1) * pageSize + 1} - {currentPage * pageSize} de {totalItems}</span>
                            <div className="flex space-x-2">
                                <FaAngleDoubleLeft className={`${!hasPrev ? 'cursor-not-allowed' : ''}`} role="button" size={18} onClick={() => hasPrev && onPageChange && onPageChange(-2)} />
                                <FaAngleLeft className={`${!hasPrev ? 'cursor-not-allowed' : ''}`} role="button" size={18} onClick={() => hasPrev && onPageChange && onPageChange(-1)} />
                                <FaAngleRight className={`${!hasNext ? 'cursor-not-allowed' : ''}`} role="button" size={18} onClick={() => hasNext && onPageChange && onPageChange(1)} />
                                <FaAngleDoubleRight className={`${!hasNext ? 'cursor-not-allowed' : ''}`} role="button" size={18} onClick={() => hasNext && onPageChange && onPageChange(2)} />
                            </div>
                        </small>
                    </div>
                }
            </footer>
        </div>
    );
};

export default Table;
