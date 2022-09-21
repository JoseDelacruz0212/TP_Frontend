import * as Yup from 'yup';

export interface InstitutionValidation {
    name?: string;
    direction?: string;
    code?: string
}

const validationSchema: Yup.SchemaOf<InstitutionValidation> = Yup.object().shape({
    name: Yup.string()
        .max(100, "El nombre debe contener 100 caracteres como máximo")
        .required("El campo nombre es requerido"),
    direction: Yup.string()
        .max(100, "La dirección debe contener 100 caracteres como máximo")
        .required("El campo dirección es requerido"),
    code: Yup.string()
        .max(25, "El código debe contener 100 caracteres como máximo")
        .required("El campo código es requerido")
});

export default validationSchema;
