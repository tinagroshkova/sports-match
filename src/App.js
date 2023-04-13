import Navbar from "./components/NavBar/NavBar";
import "./components/NavBar/NavBar"; 
import { BrowserRouter } from "react-router-dom";
import ChatPage from "./pages/Chat/Chat";


function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <ChatPage />
        </BrowserRouter>
    )

}

export default App;