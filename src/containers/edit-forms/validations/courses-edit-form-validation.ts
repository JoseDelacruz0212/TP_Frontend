import * as Yup from 'yup';

export interface CoursesValidation {
    name?: string;
    code?: string;
    description?: string;
    grade?: string;
    section?: string;
    institutionId?: string;
}

const validationSchema: Yup.SchemaOf<CoursesValidation> = Yup.object().shape({
    name: Yup.string()
        .max(100, "El nombre debe contener 100 caracteres como máximo")
        .required("El campo nombre es requerido"),
    code: Yup.string()
        .max(25, "El código debe contener 25 caracteres como máximo")
        .required("El campo código es requerido"),
    description: Yup.string()
        .max(255, "La descripción debe contener 255 caracteres como máximo")
        .required("El campo descripción es requerido"),
    grade: Yup.string()
        .max(25, "El grado debe contener 25 caracteres como máximo")
        .required("El campo grado es requerido"),
    section: Yup.string()
        .max(25, "La sección debe contener 25 caracteres como máximo")
        .required("El campo sección es requerido"),
    institutionId: Yup.string()
        .required("El campo institución es requerido")
});

export default validationSchema;
