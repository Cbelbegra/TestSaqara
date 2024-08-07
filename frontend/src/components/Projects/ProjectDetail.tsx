import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Project } from '../../types/types';
import { toast } from 'react-toastify';
import UseAuth from '../Hooks/UseAuth';

const ProjectDetail: React.FC = () => {
    const { projectId = '' } = useParams<{ projectId: string }>();
    const [project, setProject] = useState<Project | null>(null);
    const token = localStorage.getItem('jwtToken');
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const fetchProject = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_API_URL}/projects/${projectId}`,
                {
                    headers: 
                    { 
                        Authorization: `Bearer ${token}` 
                    }
                }
            );
            setProject(response.data);
            setName(response.data.name);
            setDescription(response.data.description);
        } catch (error) {
            console.error(error);
        }
    };

    UseAuth(fetchProject);

    const handleDelete = async () => {
        try {
            await axios.delete(`${process.env.REACT_APP_API_URL}/projects/${projectId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            navigate('/projects');
            toast.success('Project deleted successfully!');
        } catch (error) {
            toast.error('Unable to delete the project :' + error);
            console.error('Failed to delete the project:', error);
        }
    };

    const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await axios.put(
                `${process.env.REACT_APP_API_URL}/projects/${projectId}`,
                { name, description },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setProject(response.data);
            toast.success('Project updated successfully!');
        } catch (error) {
            toast.error('Unable to update the project: ' + error);
            console.error('Failed to update the project:', error);
        }
    };
    
    if (!project) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mt-5">
            <h1 className="mb-4 text-center">Edit Project</h1>
            <form onSubmit={handleUpdate}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea
                        className="form-control"
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div className="d-flex justify-content-center">
                    <button type="submit" className="btn btn-primary">Update</button>
                </div>
            </form>
            <hr className="my-4" />
            <h1 className="mb-4 text-center">{project.name}</h1>
            <p>{project.description}</p>
            <div className="d-flex justify-content-center">
                <button className="btn btn-danger mb-4" onClick={handleDelete}>DELETE</button>
            </div>
        </div>
    );
};

export default ProjectDetail;
