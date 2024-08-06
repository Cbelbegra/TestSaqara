import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Task, Project } from '../../types/types';
import { toast } from 'react-toastify';
import UseAuth from '../Hooks/UseAuth';


const TaskDetail: React.FC = () => {
    const { taskId } = useParams<{ taskId: string }>();
    const [task, setTask] = useState<Task | null>(null);
    const token = localStorage.getItem('jwtToken');
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [projectId, setProjectId] = useState('');
    const [projects, setProjects] = useState<Project[]>([]);

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
            setTitle(response.data.title);
            setDescription(response.data.description);
            setProjectId(response.data.projectId);
        } catch (error) {
            console.error(error);
        }
    };

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

    UseAuth(() => {
        fetchTask();
        fetchProjects();
    });

    const handleDelete = async () => {
        try {
            await axios.delete(`${process.env.REACT_APP_API_URL}/tasks/${taskId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            navigate('/tasks');
            toast.success('Task deleted successfully!');
        } catch (error) {
            toast.error('Unable to delete the task :' + error);
            console.error('Failed to delete the task:', error);
        }
    };

    const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await axios.put(
                `${process.env.REACT_APP_API_URL}/tasks/${taskId}`,
                { title, description, projectId },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setTask(response.data);
            toast.success('Task updated successfully!');
        } catch (error) {
            toast.error('Unable to update the task :' + error);
            console.error('Failed to update the task:', error);
        }
    };

    if (!task) {
        return <div>Loading...</div>;
    }

return (
        <div className="container mt-5">
            <h1 className="mb-4 text-center">Edit Task</h1>
            <form onSubmit={handleUpdate}>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input
                        type="text"
                        className="form-control"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea
                        className="form-control"
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="projectId" className="form-label">Project</label>
                    <select
                        className="form-control"
                        id="projectId"
                        value={projectId}
                        onChange={(e) => setProjectId(e.target.value)}
                    >
                        {projects.map((project) => (
                            <option key={project._id} value={project._id}>
                                {project.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="d-flex justify-content-center">
                    <button type="submit" className="btn btn-primary">Update</button>
                </div>
            </form>
            <hr className="my-4" />
            <h1 className="mb-4 text-center">{task.title}</h1>
            <p>{task.description}</p>
            <p><strong>Project:</strong> {projects.find(p => p._id === task.projectId)?.name}</p>
            <div className="d-flex justify-content-center">
                <button className="btn btn-danger mb-4" onClick={handleDelete}>DELETE</button>
            </div>
        </div>
    );
};

export default TaskDetail;
