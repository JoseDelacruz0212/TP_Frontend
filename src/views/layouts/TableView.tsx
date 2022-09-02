import React from "react";
import moment from "moment";

import {Entity} from "../../types/communication/responses/entity";
import {TableViewProps} from "../../types/components/layouts/application-layouts";

import useTableView from "../../hooks/useTableView";

import Table from "../../components/common/table/Table";
import SidePanelForm from "../../components/common/modal/SidePanelForm";

const TableView = <T extends Entity, F>({
    title,
    filterSchemaCreator,
    convertorCreator,
    columns,
    service,
    sidePanelId,
    sidePanelCreateTitle,
    sidePanelEditTitle,
    defaultItemSchema,
    addButtonText,
    formInputs: FormInputs,
    onItemClick
}: TableViewProps<T, F>) => {
    const tableData = useTableView<T, F>(columns, service, defaultItemSchema, filterSchemaCreator, convertorCreator);

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
            <div className="flex justify-end">
                <button className="button-default" onClick={tableData.onEditPanelOpen}>
                    + {addButtonText}
                </button>
            </div>
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
                                   <div className="flex space-x-2 justify-end">
                                       <button type="submit" className="button-primary">
                                           Guardar
                                       </button>
                                       <button className="button-secondary" onClick={tableData.onEditPanelClose}>
                                           Cancelar
                                       </button>
                                   </div>
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
                               </>
                           )} />
        </>
    );
};

export default TableView;
