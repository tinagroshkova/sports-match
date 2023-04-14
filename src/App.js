import Navbar from "./components/NavBar/NavBar";
import "./components/NavBar/NavBar";
import { BrowserRouter } from "react-router-dom";
import ChatPage from "./pages/Chat/Chat";



function App() {
    return (
        <div className="">

            <BrowserRouter>
                <Navbar />
                <ChatPage />
            </BrowserRouter>


        </div>
    )

}

export default App;