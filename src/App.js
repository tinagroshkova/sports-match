import React from 'react';
import Navbar from './components/NavBar';
// import LoginForm from './pages/LoginForm';
// import RegistrationForm from './pages/RegistrationForm';
import './index.css';
import './variables.css';
import { BrowserRouter } from 'react-router-dom';
// import { Routes } from 'react-router-dom';


function App() {
    return (
        <BrowserRouter>
            {/* <Routes>  */}
            <Navbar />
            {/* </Routes> */}

            {/* <LoginForm />
            <RegistrationForm /> */}
        </BrowserRouter>
    )

}

export default App;