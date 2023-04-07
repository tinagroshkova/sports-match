import React from 'react';
import Navbar from './components/NavBar';
import LoginForm from './components/LoginForm';
import RegistrationForm from './components/RegistrationForm';
import './index.css';
import './variables.css';


function App() {
    return (
        <div>
            <Navbar />
            <LoginForm />
            <RegistrationForm />

        </div>
    )

}

export default App;