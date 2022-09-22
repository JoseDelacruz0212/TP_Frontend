import {SchemaOf, ValidationError} from "yup";
import {useEffect, useState} from "react";

const useFormValidation = <T, K>(values: T, validationSchema?: SchemaOf<K>) => {
    const [_values, setValues] = useState(values);
    const [isValid, setIsValid] = useState(true);
    const [errors, setErrors] = useState<K>();

    useEffect(() => {
        validationSchema && validationSchema.validate(values, { abortEarly: false })
            .then(() => {
                setErrors(undefined);
                setIsValid(true)
            })
            .catch(error => {
                console.log(error.inner);

                setIsValid(false);

                const newErrors: K = {}  as K;

                error.inner.forEach((error: ValidationError) => {
                    // @ts-ignore
                    if (error.path && (_values[error.path] !== values[error.path] || (errors && errors[error.path]))) {
                        // @ts-ignore
                        newErrors[error.path] = error.message;
                    }
                });

                setErrors(newErrors);
            });

        if (_values !== values) {
            setValues(values);
        }
    }, [values, validationSchema]);

    return {
        isValid,
        errors
    };
};

export default useFormValidation;
