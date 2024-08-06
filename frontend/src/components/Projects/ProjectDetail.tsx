import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TaskList from '../Tasks/TaskList';
import TaskForm from '../Tasks/TaskForm';
import { useParams } from 'react-router-dom';

interface Project {
    id: string;
    name: string;
    description: string;
}

const ProjectDetail: React.FC = () => {
    const { projectId = '' } = useParams<{ projectId: string }>();
    const [project, setProject] = useState<Project | null>(null);

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/projects/${projectId}`);
                setProject(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchProject();
    }, [projectId]);

    const handleTaskAdded = () => {
        setProject(prevProject => {
            if (prevProject) {
                return { ...prevProject };
            }
            return null;
        });
    };

    if (!project) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>{project.name}</h1>
            <p>{project.description}</p>
            <TaskForm projectId={projectId} onTaskAdded={handleTaskAdded} />
            <TaskList projectId={projectId} />
        </div>
    );
};

export default ProjectDetail;
