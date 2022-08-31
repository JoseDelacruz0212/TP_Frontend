import { CoursesActionsProps } from "../../types/components/courses/courses";


const CourseActions = ({ onEdit, onDelete }: CoursesActionsProps) => (
    <div className="space-x-4">
        <button className="button-secondary w-24" onClick={onEdit}>
            Editar
        </button>
        <button className="button-error w-24" onClick={onDelete} >
            Eliminar
        </button>
    </div>
);

export default CourseActions;