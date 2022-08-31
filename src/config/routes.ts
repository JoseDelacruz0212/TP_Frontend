import menuOptions from "./menu-options";

export const getTitleForCurrentLocation = (location: string, params?: object) => {
    if (location.includes('/assessment-creator')) return 'Diseñador de evaluación';
    if (location.includes('/assessment-visualizer')) return 'Evaluación';

    switch (location) {
        case '/institutions': return 'Instituciones';
        case '/courses': return 'Cursos';
        case '/assessments': return 'Evaluaciones';
        case '/students': return 'Estudiantes';
        case '/requests': return 'Reclamos';
        case '/verification': return 'Verificación';
        case '/administration': return 'Administración';
        case '/profile': return 'Cuenta';
        default:
            return 'Title';
    }
}

export const getActiveOptionForCurrentLocation = (location: string) => {
    const activeOption = menuOptions.find(x => location.includes(x.link));
    return activeOption ? activeOption.order : -1;
}
