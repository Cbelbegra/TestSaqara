import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Task {
    id: string;
    name: string;
    description: string;
    projectId: string;
}

const TaskList: React.FC<{ projectId: string }> = ({ projectId }) => {
    const [tasks, setTasks] = useState<Task[]>([]);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/projects/${projectId}/tasks`);
                setTasks(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchTasks();
    }, [projectId]);

    return (
        <div>
            <h2>Tasks</h2>
            <ul>
                {tasks.map(task => (
                    <li key={task.id}>{task.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default TaskList;
