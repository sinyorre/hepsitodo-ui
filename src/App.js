import SignUp from "./containers/SignUp/SignUp";
import TodoList from "./containers/TodoList/TodoList";
import {Route, Routes} from "react-router-dom";
import LoginPage from "./containers/Login/LoginPage";
import {ToastContainer} from "react-toastify";

function App() {
    return (
        <div className="App">
            <ToastContainer />
            <div style={{textAlign: "center"}}>
                <h1>Hepsitodo</h1>
            </div>
            <Routes>
                <Route path="/" element={<TodoList/>}/>
                <Route path="/signup" element={<SignUp/>}/>
                <Route path="/login" element={<LoginPage/>}/>
            </Routes>
        </div>
    );
}

export default App;
