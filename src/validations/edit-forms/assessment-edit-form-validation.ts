import * as Yup from 'yup';

export interface AssessmentValidation {
    name?: string;
    availableOn?: Date;
    duration?: number;
    courseId?: string;
}

const validationSchema: Yup.SchemaOf<AssessmentValidation> = Yup.object().shape({
    name: Yup.string()
        .max(100, "El nombre debe contener 100 caracteres como máximo")
        .required("El campo nombre es requerido"),
    availableOn: Yup.date()
        .min(new Date(), 'La fecha de disponibilidad debe ser mayor a la fecha y hora actual')
        .required("El campo fecha de disponibilidad es requerido"),
    duration: Yup.number()
        .typeError("El campo duración debe ser un número")
        .positive("La duración debe ser un número positivo")
        .integer("La duración debe ser un número entero")
        .required("El campo duración es requerido"),
    courseId: Yup.string()
        .required("El campo curso es requerido")
});

export default validationSchema;
