import {Entity} from "../../communication/responses/entity";

export type FormInputProps<T extends Entity> = {
    values: T;
    onChange?: (x: T) => void;
};
