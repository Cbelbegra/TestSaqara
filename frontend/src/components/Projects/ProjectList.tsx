import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import ProjectForm from './ProjectForm'; 

interface Project {
    _id: string;
    name: string;
    description: string;
}

const ProjectList: React.FC = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const token = localStorage.getItem('jwtToken');
    const navigate = useNavigate();

    const fetchProjects = useCallback(async () => {
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
    }, [token, setProjects]);

    useEffect(() => {
        const checkToken = async () => {
            if (token) {
                try {
                    const response = await axios.get(`${process.env.REACT_APP_API_URL}/auth/validate-token`, {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    if (response.data.valid) {
                        fetchProjects();
                    } else {
                        navigate('/login');
                    }
                } catch (error) {
                    navigate('/login');
                    console.error(error);
                }
            } else {
                navigate('/login');
            }
        };
        
        checkToken();
    }, [token, navigate, fetchProjects]);

    const handleProjectCreated = () => {
        fetchProjects();
    };

    return (
        <div>
            <h1>Projects</h1>
            <ul>
                {projects.map((project) => (
                    <li key={project._id}>
                        <Link to={`/projects/${project._id}`}>
                            {project.name}
                        </Link>
                    </li>
                ))}
            </ul>
            <ProjectForm onProjectCreated={handleProjectCreated} />
        </div>
    );
};

export default ProjectList;
