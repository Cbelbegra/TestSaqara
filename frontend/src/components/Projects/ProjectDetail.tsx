import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
interface Project {
    id: string;
    name: string;
    description: string;
}

const ProjectDetail: React.FC = () => {
    const { projectId = '' } = useParams<{ projectId: string }>();
    const [project, setProject] = useState<Project | null>(null);
    const token = localStorage.getItem('jwtToken');
    const navigate = useNavigate();

    useEffect(() => {
        const checkToken = async () => {
            if (token) {
                try {
                    const response = await axios.get(
                        `${process.env.REACT_APP_API_URL}/auth/validate-token`, 
                        {
                            headers: 
                            { 
                                Authorization: `Bearer ${token}` 
                            }
                        }
                    );
                    if (response.data.valid) {
                        fetchProject();
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
            } catch (error) {
                console.error(error);
            }
        };

        checkToken();
    }, [projectId, navigate, token]);

    const handleDelete = async () => {
        try {
            await axios.delete(`${process.env.REACT_APP_API_URL}/projects/${projectId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            navigate('/projects');
        } catch (error) {
            console.error('Failed to delete the project:', error);
        }
    };

    if (!project) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>{project.name}</h1>
            <p>{project.description}</p>
            <button onClick={handleDelete}>DELETE</button>
        </div>
    );
};

export default ProjectDetail;
