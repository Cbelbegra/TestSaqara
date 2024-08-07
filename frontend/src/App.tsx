import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import ProjectList from './components/Projects/ProjectList';
import TaskList from './components/Tasks/TaskList';
import TaskDetail from './components/Tasks/TaskDetail';
import ProjectDetail from './components/Projects/ProjectDetail';
import MainLayout from './pages/MainLayout';
import SwaggerUIComponent from './components/SwaggerUI';


const App: React.FC = () => {
    return (
        <Router>
            <MainLayout>
                <Routes>
                    <Route path="/login" element={<Login/>} />
                    <Route path="/register" element={<Register/>} />
                    <Route path="/projects" element={<ProjectList/>} />
                    <Route path="/projects/:projectId" element={<ProjectDetail/>} />
                    <Route path="/tasks/" element={<TaskList/>} />
                    <Route path="/tasks/:taskId" element={<TaskDetail/>} />
                    <Route path="/api-docs" element={<SwaggerUIComponent/>} />
                </Routes>
            </MainLayout>
        </Router>
    );
};

export default App;
