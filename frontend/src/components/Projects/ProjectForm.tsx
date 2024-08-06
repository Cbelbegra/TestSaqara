import React, { useState } from 'react';
import axios from 'axios';

interface ProjectFormProps {
    onProjectCreated?: () => void;
}

const ProjectForm: React.FC<ProjectFormProps> = ({ onProjectCreated }) => {
    const [newProjectName, setNewProjectName] = useState('');
    const [newProjectDescription, setNewProjectDescription] = useState('');
    const token = localStorage.getItem('jwtToken');
    if (!token) {
        throw new Error('No token found');
    }

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
            if (onProjectCreated) {
                onProjectCreated();
            }
        } catch (error) {
            console.error('Failed to create the project:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Project Name:</label>
                <input
                    type="text"
                    value={newProjectName}
                    onChange={(e) => setNewProjectName(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Project Description:</label>
                <textarea
                    value={newProjectDescription}
                    onChange={(e) => setNewProjectDescription(e.target.value)}
                    required
                />
            </div>
            <button type="submit">Create Project</button>
        </form>
    );
};

export default ProjectForm;
