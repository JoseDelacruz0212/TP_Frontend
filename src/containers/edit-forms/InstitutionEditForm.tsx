import React from "react";

import {Institution} from "../../types/communication/responses/institutions";
import {FormInputProps} from "../../types/common";
import {InstitutionValidation} from "./validations/institution-edit-form-validation";

const InstitutionEditForm = ({ values, onChange, errors }: FormInputProps<Institution, InstitutionValidation>) => {
    return (
        <>
            <div className="form-group">
                <label htmlFor="edit-institution-name" className="form-label">
                    <div className="flex justify-between">
                        <small>Nombre</small>
                        <small className="text-overline">{values.name.length || '0'} / 100</small>
                    </div>
                </label>
                <input className="form-input"
                       id="edit-institution-name"
                       name="edit-institution-name"
                       placeholder="Nombre"
                       maxLength={100}
                       value={values.name}
                       onChange={(e) => onChange && onChange({ ...values, name: e.target.value })} />
                <small className="form-error">{errors?.name}</small>
            </div>
            <div className="form-group">
                <label htmlFor="edit-institution-address" className="form-label">
                    <div className="flex justify-between">
                        <small>Dirección</small>
                        <small className="text-overline">{values.direction.length || '0'} / 100</small>
                    </div>
                </label>
                <textarea className="form-input"
                          id="edit-institution-address"
                          name="edit-institution-address"
                          placeholder="Dirección"
                          rows={2}
                          maxLength={100}
                          value={values.direction}
                          onChange={(e) => onChange && onChange({ ...values, direction: e.target.value })} />
                <small className="form-error">{errors?.direction}</small>
            </div>
            <div className="form-group">
                <label htmlFor="edit-institution-code" className="form-label">
                    <div className="flex justify-between">
                        <small>Código</small>
                        <small className="text-overline">{values.code.length || '0'} / 25</small>
                    </div>
                </label>
                <input className="form-input"
                       id="edit-institution-code"
                       name="edit-institution-code"
                       placeholder="Código"
                       maxLength={25}
                       value={values.code}
                       onChange={(e) => onChange && onChange({ ...values, code: e.target.value })} />
                <small className="form-error">{errors?.code}</small>
            </div>
        </>
    );
}

export default InstitutionEditForm;
