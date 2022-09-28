import * as Yup from 'yup';

export interface ObjectiveValidation {
    name?: string;
    description?: string;
    courseId?: string;
}

const validationSchema: Yup.SchemaOf<ObjectiveValidation> = Yup.object().shape({
    name: Yup.string()
        .max(100, "El nombre debe contener 100 caracteres como máximo")
        .required("El campo nombre es requerido"),
    description: Yup.string()
        .max(255, "El nombre debe contener 255 caracteres como máximo")
        .required("El campo nombre es requerido"),
    courseId: Yup.string()
        .required("El campo curso es requerido")
});

export default validationSchema;
