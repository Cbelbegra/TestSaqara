import React, { useState } from 'react';
import axios from 'axios';

interface TaskFormProps {
    projectId: string;
    onTaskAdded: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ projectId, onTaskAdded }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/projects/${projectId}/tasks`, { name, description });
            setName('');
            setDescription('');
            onTaskAdded();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Task Name</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div>
                <label>Description</label>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
            </div>
            <button type="submit">Add Task</button>
        </form>
    );
};

export default TaskForm;
