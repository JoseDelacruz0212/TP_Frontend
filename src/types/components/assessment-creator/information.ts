import {Option} from "../common/options";

export type GeneralInfoProps = {
    courseOptions: Option[];
    courseId: string;
    setCourseId: (x: string) => void;
    title: string;
    setTitle: (x: string) => void;
};
