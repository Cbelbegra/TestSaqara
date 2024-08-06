import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

interface Project {
    _id: string;
    name: string;
    description: string;
}

const ProjectList: React.FC = () => {
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

    return (
        <div>
            <h1>Projects</h1>
            <ul>
                {projects.map((project) => (
                    <li key={project._id}>
                        <Link to={`/projects/${project._id}/tasks`}>
                            {project.name ? project.name : 'Unnamed Project'}
                        </Link>
                    </li>
                ))}
        </ul>
        </div>
    );
};

export default ProjectList;
