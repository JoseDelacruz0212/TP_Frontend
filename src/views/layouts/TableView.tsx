import React from "react";
import moment from "moment";
import * as Yup from 'yup';

import {Entity} from "../../types/communication/responses/entity";
import {ConvertorCreator, FilterSchemaCreator, FormInputProps, Service} from "../../types/common";

import useTableView from "../../hooks/useTableView";

import Table from "../../components/common/table/Table";
import SidePanelForm from "../../components/common/modal/SidePanelForm";
import HasPermission from "../../hoc/with-permission/HasPermission";

const defaultFilterSchemaCreator = () => [];
const defaultConvertorCreator = () => () => null;

interface TableViewProps<T extends Entity, F, K> {
    title: string;
    filterSchemaCreator?: FilterSchemaCreator<F>;
    convertorCreator?: ConvertorCreator<T>
    columns: React.ReactNode[];
    service: Service<T, F>;
    sidePanelId?: string;
    sidePanelCreateTitle?: string;
    sidePanelEditTitle?: string;
    defaultItemSchema?: T;
    addButtonText?: string;
    formInputs?: React.ComponentType<FormInputProps<T, K>>;
    onItemClick?: (id: number | string) => void;
    showAuditInfo?: boolean;
    canAddPermission?: string;
    defaultFilters?: object;
    hideAddButton?: boolean;
    formValidationSchema?: Yup.SchemaOf<K>;
}

const TableView = <T extends Entity, F, K>({
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
    formValidationSchema,
}: TableViewProps<T, F, K>) => {
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
                   onClick={onItemClick}
                   isLoading={tableData.isLoading} />
            <SidePanelForm title={tableData.item.id ? sidePanelEditTitle : sidePanelCreateTitle}
                           sidePanelId={sidePanelId}
                           showLoadingIndicator={tableData.showPanelLoadingIndicator}
                           isEditPanelOpen={tableData.isEditPanelOpen}
                           handleClose={tableData.onEditPanelClose}
                           onSubmit={tableData.onSaveItem}
                           values={tableData.item}
                           onChange={tableData.onItemUpdate}
                           validationSchema={formValidationSchema}
                           formInputs={({ values, onChange, isValid, errors }: any) => (
                               <>
                                   { FormInputs && tableData.item && <FormInputs values={values} onChange={onChange} errors={errors} /> }
                                   <div className="flex space-x-2 justify-end pt-5">
                                       <button type="submit" className="button-primary" disabled={!isValid}>
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
