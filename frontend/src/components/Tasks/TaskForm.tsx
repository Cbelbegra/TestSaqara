import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface TaskFormProps {
    onTaskCreated?: () => void;
}

interface Project {
    id: string;
    name: string;
}

const TaskForm: React.FC<TaskFormProps> = ({ onTaskCreated }) => {
    const [newTaskName, setNewTaskName] = useState('');
    const [newTaskProjectId, setNewTaskProjectId] = useState('');
    const [newTaskDescription, setNewTaskDescription] = useState('');
    const [projects, setProjects] = useState<Project[]>([]);

    const token = localStorage.getItem('jwtToken');
    if (!token) {
        throw new Error('No token found');
    }

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_API_URL}/projects`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setProjects(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchProjects();
    }, [token]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}/tasks`, 
                { 
                    title: newTaskName, 
                    description : newTaskDescription, 
                    projectId: newTaskProjectId,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <h1>Add Task</h1>
            </div>
            <div>
                <label>Task Name</label>
                <input type="text" value={newTaskName} onChange={(e) => setNewTaskName(e.target.value)} required />
            </div>
            <div>
                <label>Project ID</label>
                <select value={newTaskProjectId} onChange={(e) => setNewTaskProjectId(e.target.value)} required>
                    <option value="" disabled>Select a project</option>
                    {projects.map((project) => (
                        <option key={project.id} value={project.id}>
                            {project.name}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label>Description</label>
                <textarea value={newTaskDescription} onChange={(e) => setNewTaskDescription(e.target.value)} required />
            </div>
            <button type="submit">Add Task</button>
        </form>
    );
};

export default TaskForm;
