import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

interface Task {
    id: string;
    name: string;
    description: string;
    projectId: string;
}

const TaskDetail: React.FC = () => {
    const { projectId, taskId } = useParams<{ projectId: string, taskId: string }>();
    const [task, setTask] = useState<Task | null>(null);

    useEffect(() => {
        const fetchTask = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/tasks/${taskId}`);
                setTask(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchTask();
    }, [taskId]);

    if (!task) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>{task.name}</h2>
            <p>{task.description}</p>
        </div>
    );
};

export default TaskDetail;
