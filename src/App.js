import Navbar from "./components/NavBar/NavBar";
import "./components/NavBar/NavBar"; 
import { BrowserRouter } from "react-router-dom";
import ChatPage from "./pages/Chat/Chat";


function App() {
    return (
        <BrowserRouter>
            {/* <Routes>  */}
            <Navbar />
            {/* </Routes> */}
            <ChatPage />

            {/* <LoginForm />
            <RegistrationForm /> */}
        </BrowserRouter>
    )

}

export default App;