import React from "react";
import moment from "moment";

import {Entity} from "../../types/communication/responses/entity";
import {ConvertorCreator, FilterSchemaCreator, FormInputProps} from "../../types/common";

import {CrudService} from "../../services/CrudService";

import useTableView from "../../hooks/useTableView";

import Table from "../../components/common/table/Table";
import SidePanelForm from "../../components/common/modal/SidePanelForm";
import HasPermission from "../../hoc/with-permission/HasPermission";

const defaultFilterSchemaCreator = () => [];
const defaultConvertorCreator = () => () => null;

interface TableViewProps<T extends Entity, F> {
    title: string;
    filterSchemaCreator?: FilterSchemaCreator<F>;
    convertorCreator?: ConvertorCreator<T>
    columns: React.ReactNode[];
    service: CrudService<T, F>;
    sidePanelId?: string;
    sidePanelCreateTitle?: string;
    sidePanelEditTitle?: string;
    defaultItemSchema?: T;
    addButtonText?: string;
    formInputs?: React.ComponentType<FormInputProps<T>>;
    onItemClick?: (id: number | string) => void;
    showAuditInfo?: boolean;
    canAddPermission?: string;
    defaultFilters?: object;
    hideAddButton?: boolean;
}

const TableView = <T extends Entity, F>({
    title,
    filterSchemaCreator = defaultFilterSchemaCreator,
    convertorCreator = defaultConvertorCreator,
    columns,
    service,
    sidePanelId = "",
    sidePanelCreateTitle = "",
    sidePanelEditTitle = "",
    defaultItemSchema = {} as T,
    addButtonText = "",
    formInputs: FormInputs,
    onItemClick,
    showAuditInfo = true,
    canAddPermission,
    defaultFilters,
    hideAddButton = false,
}: TableViewProps<T, F>) => {
    const tableData = useTableView<T, F>(columns, service, defaultItemSchema, filterSchemaCreator, convertorCreator, defaultFilters);

    const getNewPage = (option: number) => {
        if (!tableData.pagination) return undefined;

        if (Math.abs(option) === 2) {
            if (option < 0) return 1;
            return tableData.pagination.lastPage
        } else {
            return tableData.pagination.page + option;
        }
    };

    return (
        <>
            {
                !hideAddButton &&
                <HasPermission permission={canAddPermission}>
                    <div className="flex justify-end">
                        <button className="button-default" onClick={tableData.onEditPanelOpen}>
                            + {addButtonText}
                        </button>
                    </div>
                </HasPermission>
            }
            <Table title={title}
                   columns ={tableData.tableColumns}
                   rows={tableData.tableData}
                   onPageChange={(option) => tableData.onPageUpdate(getNewPage(option))}
                   onPageSizeChanged={(pageSize) => tableData.onPageSizeUpdate(pageSize)}
                   onFiltersClosed={() => {}}
                   filterSchemas={tableData.filterSchemas}
                   hasNext={tableData.pagination?.hasNext}
                   hasPrev={tableData.pagination?.hasPrev}
                   pageSize={tableData.pagination?.pageSize}
                   currentPage={tableData.pagination?.page}
                   totalItems={tableData.pagination?.totalItems}
                   onClick={onItemClick} />
            <SidePanelForm title={tableData.item.id ? sidePanelEditTitle : sidePanelCreateTitle}
                           sidePanelId={sidePanelId}
                           isEditPanelOpen={tableData.isEditPanelOpen}
                           handleClose={tableData.onEditPanelClose}
                           onSubmit={tableData.onSaveItem}
                           formInputs={(
                               <>
                                   { FormInputs && tableData.item && <FormInputs values={tableData.item} onChange={tableData.onItemUpdate} /> }
                                   <div className="flex space-x-2 justify-end pt-5">
                                       <button type="submit" className="button-primary">
                                           Guardar
                                       </button>
                                       <button type="button" className="button-secondary" onClick={tableData.onEditPanelClose}>
                                           Cancelar
                                       </button>
                                   </div>
                                   {
                                       showAuditInfo && tableData.item.id &&
                                       <div className="flex flex-col space-y-5">
                                           <div>
                                               <span className="font-bold block">Fecha de última actualización:</span>
                                               <span>{moment(tableData.item.updatedOn).format('LLL')}</span>
                                           </div>
                                           <div>
                                               <span className="font-bold block">Actualizado por:</span>
                                               <span>{tableData.item.updatedBy}</span>
                                           </div>
                                       </div>
                                   }
                               </>
                           )} />
        </>
    );
};

export default TableView;
