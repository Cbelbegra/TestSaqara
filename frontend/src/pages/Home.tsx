import React from 'react';
import ProjectList from '../components/Projects/ProjectList';
import ProjectForm from '../components/Projects/ProjectForm';

const Home: React.FC = () => {
    return (
        <div>
            <h1>Home</h1>
            <ProjectForm />
            <ProjectList />
        </div>
    );
};

export default Home;
