import React, { useState } from 'react';
import axios from 'axios';

const ProjectForm: React.FC = () => {
    const token = localStorage.getItem('jwtToken');
    if (!token) {
        throw new Error('No token found');
    }
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}/projects`,
                { 
                    name: name,
                    description: description
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
                <label>Project Title:</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                <br />
                <label>Project Description:</label>
                <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
            </div>
            <button type="submit">Create Project</button>
        </form>
    );
};

export default ProjectForm;
