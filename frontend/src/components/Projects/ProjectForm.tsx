import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

interface ProjectFormProps {
    onProjectCreated?: () => void;
}

const ProjectForm: React.FC<ProjectFormProps> = ({ onProjectCreated }) => {
    const [newProjectName, setNewProjectName] = useState('');
    const [newProjectDescription, setNewProjectDescription] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const token = localStorage.getItem('jwtToken');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.post(
                `${process.env.REACT_APP_API_URL}/projects`,
                { 
                    name: newProjectName,
                    description : newProjectDescription
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setNewProjectName('');
            setNewProjectDescription('');
            toast.success('Project created successfully!');
            if (onProjectCreated) {
                onProjectCreated();
            }
        } catch (error) {
            toast.error('Failed to create the project.');
            console.error('Failed to create the project:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4 text-center">Create New Project</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Project Name</label>
                    <input
                        type="text"
                        className="form-control"
                        value={newProjectName}
                        onChange={(e) => setNewProjectName(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea
                        className="form-control"
                        value={newProjectDescription}
                        onChange={(e) => setNewProjectDescription(e.target.value)}
                        required
                    />
                </div>
                <div className="d-flex justify-content-center">
                    <button type="submit" className="btn btn-primary" disabled={isLoading}>
                        {isLoading ? 'Creating...' : 'Create Project'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ProjectForm;
