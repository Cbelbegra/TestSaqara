import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom';
import TaskForm from './TaskForm';

interface Task {
    _id: string;
    title: string;
    description: string;
    projectId: string;
}

const TaskList: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const token = localStorage.getItem('jwtToken');
    const navigate = useNavigate();

    const fetchTasks = useCallback(async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_API_URL}/tasks`,
                {
                    headers: 
                    { 
                        Authorization: `Bearer ${token}` 
                    }
                }
            );
            setTasks(response.data);
        } catch (error) {
            console.error(error);
        }
    }, [token, setTasks]);

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
                        fetchTasks();
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
    }, [navigate, token, fetchTasks]);

    const handleTaskCreated = () => {
        fetchTasks();
    };

    return (
        <div>
            <h1>Tasks</h1>
            <ul>
                {tasks.map((task) => (
                    <li key={task._id}>
                        <Link to={`/tasks/${task._id}`}>
                            {task.title}
                        </Link>
                    </li>
                ))}
            </ul>
            <TaskForm onTaskCreated={handleTaskCreated} />
        </div>
    );
};

export default TaskList;
