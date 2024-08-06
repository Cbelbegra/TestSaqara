import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
    return (
        <div>
            <h1>Home</h1>
            <nav>
                <ul>
                    <li><Link to="/projects">List of Projects</Link></li>
                    <li><Link to="/projects/new">Create New Project</Link></li>
                    <li><Link to="/tasks">List of Tasks</Link></li>
                    <li><Link to="/tasks/new">Create New Task</Link></li>
                </ul>
            </nav>
        </div>
    );
};

export default Home;
