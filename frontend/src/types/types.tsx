export interface Project {
    _id: string;
    name: string;
    description: string;
}

export interface Task {
    _id: string;
    title: string;
    description: string;
    projectId: string;
}
