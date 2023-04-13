import Navbar from "./components/NavBar/NavBar";
import "./components/NavBar/NavBar";
import { BrowserRouter } from "react-router-dom";
import ChatPage from "./pages/Chat/Chat";
import { Auth } from "./components/auth";


function App() {
    return (
        <div className="">
            <Auth />
            <BrowserRouter>
                {/* <Routes>  */}
                <Navbar />
                {/* </Routes> */}
                <ChatPage />

                {/* <LoginForm />
            <RegistrationForm /> */}
            </BrowserRouter>


        </div>
    )

}

export default App;