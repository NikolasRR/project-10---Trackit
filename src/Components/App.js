import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import UserDataContext from "./UserDataContext";
import LoginScreen from "./LoginScreen";
import SignUpScreen from "./SignUpScreen";

import "../assets/css/reset.css";
import "../assets/css/style.css";
import Today from "./Today";

function App() {
    const [userData, setUserData] = useState({});

    return (
        <UserDataContext.Provider value={{ userData, setUserData }}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<LoginScreen />} />
                    <Route path="/cadastro" element={<SignUpScreen />} />
                    <Route path="/hoje" element={<Today />} />
                </Routes>
            </BrowserRouter>
        </UserDataContext.Provider>
    )
}

export default App;