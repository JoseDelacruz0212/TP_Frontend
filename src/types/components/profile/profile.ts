export type ProfileProps = {
    firstName: string;
    lastName: string;
    email: string;
    rol: string;
    image?: string;
    onSelectedImageChange?: (x: string) => void;
}