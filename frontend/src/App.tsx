import React from 'react';
import { BrowserRouter as Router, Route, Routes, useParams } from 'react-router-dom'; // Import the useParams hook
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Home from './pages/Home';
import ProjectList from './components/Projects/ProjectList';
import TaskList from './components/Tasks/TaskList';
import TaskDetail from './components/Tasks/TaskDetail';
import ProjectDetail from './components/Projects/ProjectDetail';
import ProjectForm from './components/Projects/ProjectForm';
import TaskForm from './components/Tasks/TaskForm';

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login/>} />
                <Route path="/register" element={<Register/>} />
                <Route path="/" element={<Home/>} />
                <Route path="/projects" element={<ProjectList/>} />
                <Route path="/projects/:projectId" element={<ProjectDetail/>} />
                <Route path="/projects/new" element={<ProjectForm/>} />
                <Route path="/tasks/" element={<TaskList/>} />
                <Route path="/tasks/:taskId" element={<TaskDetail/>} />
                <Route path="/tasks/new" element={<TaskForm/>} />
            </Routes>
        </Router>
    );
};

export default App;
