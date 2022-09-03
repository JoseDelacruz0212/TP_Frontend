import React from "react";
import moment from "moment";

import {ConvertorCreator} from "../../types/hooks/table";
import {InstitutionFilter} from "../../types/communication/requests/institutions";
import {Institution} from "../../types/communication/responses/institutions";
import {Permissions} from "../../types/app/auth";

import InstitutionService from "../../services/InstitutionService";

import Text from "../../components/common/table/filter-renderer/elements/Text";
import InstitutionEditForm from "../../containers/edit-forms/InstitutionEditForm";
import MenuOptions from "../../components/common/menu/MenuOptions";

import {withInstitutionsProvider} from "../../redux/providers/providers";

import withPermission from "../../hoc/with-permission/withPermission";

import TableView from "../layouts/TableView";
import {IoPencilOutline, IoTrashOutline} from "react-icons/io5";
import {Entity} from "../../types/communication/responses/entity";

const defaultInstitution: Institution = {
    name: '',
    direction: '',
    code: ''
};

const Institutions = () => {
    const convertorCreator: ConvertorCreator<Institution> = (onEdit, onDelete) => (column, rowData) => {
        let value: React.ReactNode = null;

        switch (column) {
            case 1: value = <div className="py-4">{rowData.name}</div>; break;
            case 2: value = <div className="py-4">{rowData.direction}</div>; break;
            case 3: value = <div className="py-4">{rowData.code}</div>; break;
            case 4: value = <div className="py-4">{rowData.createdBy}</div>; break;
            case 5: value = <div className="py-4">{moment(rowData.createdOn).format('LLL')}</div>; break;
            case 6: value = (
                    <div className="flex justify-end px-5">
                        <MenuOptions options={getMenuOptions<Institution>(onEdit, onDelete, rowData)} />
                    </div>
                );
                break;
        };

        return value;
    };

    return (
        <div className="flex flex-col space-y-5">
            <TableView title="Lista de instituciones"
                       filterSchemaCreator={createFilterSchema}
                       convertorCreator={convertorCreator}
                       columns={columns}
                       service={InstitutionService}
                       sidePanelId="edit-institution-side-panel"
                       sidePanelEditTitle="Editar institución"
                       sidePanelCreateTitle="Agregar institución"
                       formInputs={InstitutionEditForm}
                       defaultItemSchema={defaultInstitution}
                       addButtonText="Crear institución" />
        </div>
    )
};

const createFilterSchema = (filters: InstitutionFilter, onFiltersUpdate: (x: InstitutionFilter) => any) => ([
    {
        id: "institution-name-filter",
        type: Text,
        initialValue: filters.name,
        onChange: (value: string) => onFiltersUpdate({ ...filters, name: value }),
        withLabel: true,
        label: 'Nombre',
        placeholder: 'Nombre'
    },
    {
        id: "institution-address-filter",
        type: Text,
        initialValue: filters.direction,
        onChange: (value: string) => onFiltersUpdate({ ...filters, direction: value }),
        withLabel: true,
        label: 'Dirección',
        placeholder: 'Dirección',
    },
    {
        id: "institution-code-filter",
        type: Text,
        initialValue: filters.code,
        onChange: (value: string) => onFiltersUpdate({ ...filters, code: value }),
        withLabel: true,
        label: 'Código',
        placeholder: 'Código',
    }
]);

const columns = ["Nombre", "Dirección", "Código", "Creado por", "Fecha de creación", ""];

const getMenuOptions = <T extends Entity>(onEdit: (x: T) => void, onDelete: (x: string) => void, rowData: T) => [
    <div role="button" className="menu-option text-secondary-dark" onClick={() => onEdit(rowData)}>
        <div><IoPencilOutline /></div>
        <span>Editar</span>
    </div>,
    <div role="button" className="menu-option text-error" onClick={() => onDelete(rowData.id!)}>
        <div><IoTrashOutline /></div>
        <span>Eliminar</span>
    </div>
];

export default withPermission(withInstitutionsProvider(Institutions), Permissions.INSTITUTIONS);
