import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import TaskForm from './TaskForm';
import { Task } from '../../types/types';
import UseAuth from '../Hooks/UseAuth';

const TaskList: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const token = localStorage.getItem('jwtToken');

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

    UseAuth([fetchTasks]);

    const handleTaskCreated = () => {
        fetchTasks();
    };

    return (
        <div className="container mt-5">
            <h1 className="mb-4 text-center">Tasks</h1>
            {tasks.length === 0 ? (
                <p className="text-center">No tasks available. Please create a new task.</p>
            ) : (
                <ul className="list-group mb-4">
                    {tasks.map((task) => (
                        <li key={task._id} className="list-group-item">
                            <Link to={`/tasks/${task._id}`} className="text-decoration-none">
                                {task.title}
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
            <hr className="my-4" />
            <TaskForm onTaskCreated={handleTaskCreated} />
        </div>
    );
};

export default TaskList;
