import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Project } from '../../types/types';
import ProjectForm from './ProjectForm';
import UseAuth from '../Hooks/UseAuth';

const ProjectList: React.FC = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const token = localStorage.getItem('jwtToken');

    const fetchProjects = useCallback(async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_API_URL}/projects`,
                {
                    headers: 
                    { 
                        Authorization: `Bearer ${token}` 
                    }
                }
            );
            setProjects(response.data);
        } catch (error) {
            console.error(error);
        }
    }, [token, setProjects]);

    UseAuth(fetchProjects);

    const handleProjectCreated = () => {
        fetchProjects();
    };

    return (
        <div className="container mt-5">
            <h1 className="mb-4 text-center">Projects</h1>
            {projects.length === 0 ? (
                <p className="text-center">No projects available. Please create a new project.</p>
            ) : (
                <ul className="list-group mb-4">
                    {projects.map((project) => (
                        <li key={project._id} className="list-group-item">
                            <Link to={`/projects/${project._id}`} className="text-decoration-none">
                                {project.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
            <hr className="my-4" />
            <ProjectForm onProjectCreated={handleProjectCreated} />
        </div>
    );
};

export default ProjectList;
