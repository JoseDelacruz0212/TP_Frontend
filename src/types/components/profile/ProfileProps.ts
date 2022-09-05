export type ProfileProps = {
    firstName: string;
    lastName: string;
    email: string;
    rol: string;
    image?: number;
    onSelectedImageChange?: (x: number) => void;
}