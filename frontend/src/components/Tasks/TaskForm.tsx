import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Project } from '../../types/types';
import { toast } from 'react-toastify';

interface TaskFormProps {
    onTaskCreated?: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onTaskCreated }) => {
    const [newTaskName, setNewTaskName] = useState('');
    const [newTaskProjectId, setNewTaskProjectId] = useState('');
    const [newTaskDescription, setNewTaskDescription] = useState('');
    const [projects, setProjects] = useState<Project[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const token = localStorage.getItem('jwtToken');

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
        setIsLoading(true);
        try {
            await axios.post(
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
            setNewTaskName('');
            setNewTaskProjectId('');
            setNewTaskDescription('');
            toast.success('Task created successfully!');
            if (onTaskCreated) {
                onTaskCreated();
            }
        } catch (error) {
            toast.error('Failed to create the task.');
            console.error('Failed to create the project:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mb-4">
            <div className="mb-3">
                <h1 className="text-center">Add Task</h1>
            </div>
            <div className="mb-3">
                <label htmlFor="projectId" className="form-label">Project ID</label>
                <select
                    className="form-select"
                    id="projectId"
                    value={newTaskProjectId}
                    onChange={(e) => setNewTaskProjectId(e.target.value)}
                    required
                >
                    <option value="" disabled>Select a project</option>
                    {projects.map((project) => (
                        <option key={project._id} value={project._id}>
                            {project.name}
                        </option>
                    ))}
                </select>
            </div>
            <div className="mb-3">
                <label htmlFor="taskName" className="form-label">Task Name</label>
                <input
                    type="text"
                    className="form-control"
                    id="taskName"
                    value={newTaskName}
                    onChange={(e) => setNewTaskName(e.target.value)}
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor="description" className="form-label">Description</label>
                <textarea
                    className="form-control"
                    id="description"
                    value={newTaskDescription}
                    onChange={(e) => setNewTaskDescription(e.target.value)}
                    required
                />
            </div>
            <div className="d-flex justify-content-center">
                <button type="submit" className="btn btn-primary" disabled={isLoading}>
                    {isLoading ? 'Adding...' : 'Add Task'}
                </button>
            </div>
        </form>
    );
};

export default TaskForm;
