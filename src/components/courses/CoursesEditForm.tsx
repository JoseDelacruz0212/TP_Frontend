import ICourses from "../../types/communication/responses/courses";
import {FormInputs} from "../../types/components/common/modal";

const CourseEditForm = ({ values, onChange }: FormInputs<ICourses>) => {
    return (
        <>
            <div className="form-group">
                <label htmlFor="edit-course-name" className="form-label">
                    <div className="flex justify-between">
                        <small>Nombre</small>
                        <small className="text-overline">{values.name.length || '0'} / 100</small>
                    </div>
                </label>
                <input className="form-input"
                       id="edit-course-name"
                       name="edit-course-name"
                       placeholder="Nombre"
                       maxLength={100}
                       value={values.name}
                       onChange={(e) => onChange && onChange({ ...values, name: e.target.value })} />
            </div>
            <div className="form-group">
                <label htmlFor="edit-course-address" className="form-label">
                    <div className="flex justify-between">
                        <small>Descripción</small>
                        <small className="text-overline">{values.description.length || '0'} / 100</small>
                    </div>
                </label>
                <textarea className="form-input"
                          id="edit-course-address"
                          name="edit-course-address"
                          placeholder="Descripción"
                          rows={2}
                          maxLength={100}
                          value={values.description}
                          onChange={(e) => onChange && onChange({ ...values, descripcion: e.target.value })} />
            </div>
            <div className="form-group">
                <label htmlFor="edit-course-code" className="form-label">
                    <div className="flex justify-between">
                        <small>Institucion</small>
                        <small className="text-overline">{values.institution.length || '0'} / 25</small>
                    </div>
                </label>
                <input className="form-input"
                       id="edit-course-code"
                       name="edit-course-code"
                       placeholder="Institución"
                       maxLength={25}
                       value={values.institution}
                       onChange={(e) => onChange && onChange({ ...values, institution: e.target.value })} />
            </div>
        </>
    );
}

export default CourseEditForm;
