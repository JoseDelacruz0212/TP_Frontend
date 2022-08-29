export const getTitleForCurrentLocation = (location: string, params?: object) => {
    if (location.includes('/assessment-creator')) return 'Diseñador de evaluación';
    if (location.includes('/assessment-visualizer')) return 'Evaluación';

    switch (location) {
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
    switch (location) {
        case '/courses': return 1;
        case '/assessments': return 2;
        case '/students': return 3;
        case '/requests': return 4;
        case '/verification': return 5;
        case '/administration': return 6;
        case '/profile': return 7;
        default:
            return -1;
    }
}
