import Navbar from "./components/NavBar/NavBar";
import "./components/NavBar/NavBar.scss";
import { BrowserRouter } from "react-router-dom";



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