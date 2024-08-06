import React from 'react';
import { BrowserRouter as Router, Route, Routes, useParams } from 'react-router-dom'; // Import the useParams hook
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Home from './pages/Home';
import ProjectList from './components/Projects/ProjectList';
import TaskList from './components/Tasks/TaskList';
import TaskDetail from './components/Tasks/TaskDetail';
import ProjectDetail from './components/Projects/ProjectDetail';

const TaskListWrapper: React.FC = () => {
    const { projectId = '' } = useParams<{ projectId: string }>();
    return <TaskList projectId={projectId} />;
};

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login/>} />
                <Route path="/register" element={<Register/>} />
                <Route path="/" element={<Home/>} />
                <Route path="/projects" element={<ProjectList/>} />
                <Route path="/projects/:projectId" element={<ProjectDetail/>} />
                <Route path="/projects/:projectId/tasks/" element={<TaskListWrapper/>} />
                <Route path="/projects/:projectId/tasks/:taskId" element={<TaskDetail/>} />
            </Routes>
        </Router>
    );
};

export default App;
