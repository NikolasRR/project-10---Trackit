import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import UserDataContext from "./UserDataContext";
import LoginScreen from "./LoginScreen";
import SignUpScreen from "./SignUpScreen";

import "../assets/css/reset.css";
import "../assets/css/style.css";
import Today from "./Today/Today";
import Habits from "./Habits/Habits";
import History from "./History";

function App() {
    const [userData, setUserData] = useState({});
    useEffect(() => {
        if (localStorage.getItem("user") !== null) {
            setUserData(JSON.parse(localStorage.getItem("user")));
        }
    }, []);

    return (
        <UserDataContext.Provider value={{ userData, setUserData }}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<LoginScreen />} />
                    <Route path="/cadastro" element={<SignUpScreen />} />
                    <Route path="/hoje" element={<Today />} />
                    <Route path="/habitos" element={<Habits />} />
                    <Route path="/historico" element={<History />} />
                </Routes>
            </BrowserRouter>
        </UserDataContext.Provider>
    )
}

export default App;