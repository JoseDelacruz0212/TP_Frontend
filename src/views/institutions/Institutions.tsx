import React, {useState} from "react";

import {IoCloseOutline} from "react-icons/io5";

import {Convertor} from "../../types/hooks/table";
import {InstitutionFilter} from "../../types/communication/requests/institutions";
import {Institution} from "../../types/communication/responses/institutions";

import {withInstitutionsProvider} from "../../redux/providers/providers";

import InstitutionService from "../../services/InstitutionService";

import Text from "../../components/common/table/filter-renderer/elements/Text";
import SidePanel from "../../components/common/modal/SidePanel";
import TableView from "../../components/common/table/TableView";
import {useSliceActions} from "../../redux/providers/SliceProvider";
import {useDispatch} from "react-redux";

const defaultInstitution = {
    name: '',
    direction: '',
    code: ''
};

const Institutions = () => {
    const [isEditPanelOpen, setIsEditPanelOpen] = useState(false);
    const [institution, setInstitution] = useState<Institution>(defaultInstitution);

    const dispatch = useDispatch();
    const { dataItemDeleted, dataItemUpdated } = useSliceActions();

    const convertor: Convertor<Institution> = (column, rowData) => {
        let value: React.ReactNode = null;

        switch (column) {
            case 1: value = <div className="py-4">{rowData.name}</div>; break;
            case 2: value = <div className="py-4">{rowData.direction}</div>; break;
            case 3: value = <div className="py-4">{rowData.code}</div>; break;
            case 4: value = (
                    <div className="flex justify-end space-x-4">
                        <button className="button-secondary w-24"
                                onClick={() => onEditItem(rowData)}>
                            Editar
                        </button>
                        <button className="button-error w-24"
                                onClick={() => onDeleteItem(rowData.id)}>
                            Eliminar
                        </button>
                    </div>
                );
                break;
        };

        return value;
    };

    const onSaveItem = () => {
        InstitutionService.saveItem(institution).then(
            () => {
                dispatch(dataItemUpdated(institution));
                closeEditPanel();
            }
        );
    };

    const onEditItem = (item: Institution) => {
        setIsEditPanelOpen(true);
        setInstitution(item);
    };

    const onDeleteItem = (id?: string) =>
        id && InstitutionService.deleteItem(id).then(() => dispatch(dataItemDeleted(id)));

    const closeEditPanel = () => {
        setIsEditPanelOpen(false);
        setInstitution(defaultInstitution);
    };

    return (
        <div className="flex flex-col space-y-5">
            <div className="flex justify-end">
                <button className="button-default" onClick={() => setIsEditPanelOpen(true)}>
                    + Crear institución
                </button>
            </div>
            <TableView title="Lista de instituciones"
                       createFilterSchema={createFilterSchema}
                       columns={columns}
                       convertor={convertor}
                       service={InstitutionService} />
            <SidePanel id="institution-edit" isOpen={isEditPanelOpen}>
                <div className="flex flex-col space-y-10 p-2">
                    <div className="flex justify-between items-end">
                        <h6>Agregar institución</h6>
                        <button onClick={closeEditPanel}>
                            <IoCloseOutline size={20} />
                        </button>
                    </div>
                    <form id="institution-edit-form" className="flex flex-col space-y-5">
                        <div className="form-group">
                            <label htmlFor="edit-institution-name" className="form-label">
                                <div className="flex justify-between">
                                    <small>Nombre</small>
                                    <small className="text-overline">{institution.name.length || '0'} / 100</small>
                                </div>
                            </label>
                            <input className="form-input"
                                   id="edit-institution-name"
                                   name="edit-institution-name"
                                   placeholder="Nombre"
                                   maxLength={100}
                                   value={institution.name}
                                   onChange={(e) => setInstitution({ ...institution, name: e.target.value })} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="edit-institution-address" className="form-label">
                                <div className="flex justify-between">
                                    <small>Dirección</small>
                                    <small className="text-overline">{institution.direction.length || '0'} / 100</small>
                                </div>
                            </label>
                            <textarea className="form-input"
                                      id="edit-institution-address"
                                      name="edit-institution-address"
                                      placeholder="Dirección"
                                      rows={2}
                                      maxLength={100}
                                      value={institution.direction}
                                      onChange={(e) => setInstitution({ ...institution, direction: e.target.value })} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="edit-institution-code" className="form-label">
                                <div className="flex justify-between">
                                    <small>Código</small>
                                    <small className="text-overline">{institution.code.length || '0'} / 25</small>
                                </div>
                            </label>
                            <input className="form-input"
                                   id="edit-institution-code"
                                   name="edit-institution-code"
                                   placeholder="Código"
                                   maxLength={25}
                                   value={institution.code}
                                   onChange={(e) => setInstitution({ ...institution, code: e.target.value })} />
                        </div>
                    </form>
                    <div className="flex space-x-2 justify-end">
                        <button className="button-primary" onClick={onSaveItem}>
                            Guardar
                        </button>
                        <button className="button-secondary" onClick={closeEditPanel}>
                            Cancelar
                        </button>
                    </div>
                </div>
            </SidePanel>
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

const columns = ["Nombre", "Dirección", "Código", ""];

export default withInstitutionsProvider(Institutions);
