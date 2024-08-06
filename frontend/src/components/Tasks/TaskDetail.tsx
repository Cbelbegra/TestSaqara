import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

interface Task {
    id: string;
    title: string;
    description: string;
    projectId: string;
}

const TaskDetail: React.FC = () => {
    const { projectId, taskId } = useParams<{ projectId: string, taskId: string }>();
    const [task, setTask] = useState<Task | null>(null);
    const token = localStorage.getItem('jwtToken');
    const navigate = useNavigate();

    useEffect(() => {
        const checkToken = async () => {
            if (token) {
                try {
                    const response = await axios.get(`${process.env.REACT_APP_API_URL}/auth/validate-token`, {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    if (response.data.valid) {
                        fetchTask();
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

        const fetchTask = async () => {
            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_API_URL}/tasks/${taskId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setTask(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        checkToken();
    }, [taskId, navigate, token]);

    const handleDelete = async () => {
        try {
            await axios.delete(`${process.env.REACT_APP_API_URL}/tasks/${taskId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            navigate('/tasks');
        } catch (error) {
            console.error('Failed to delete the task:', error);
        }
    };

    if (!task) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>{task.title}</h2>
            <p>{task.description}</p>
            <p>{task.projectId}</p>
            <button onClick={handleDelete}>DELETE</button>
        </div>
    );
};

export default TaskDetail;
