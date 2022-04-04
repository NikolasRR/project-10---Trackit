import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import UserDataContext from "./Contexts/UserDataContext";
import PercentageDoneContext from "./Contexts/PercentageDoneContext";
import LoginScreen from "./LoginScreen";
import SignUpScreen from "./SignUpScreen";

import "../assets/css/reset.css";
import "../assets/css/style.css";
import Today from "./Today/Today";
import Habits from "./Habits/Habits";
import History from "./History";

function App() {
    const [userData, setUserData] = useState({});
    const [percentageDone, setPercentageDone] = useState(0);
    useEffect(() => {
        if (localStorage.getItem("user") !== null) {
            setUserData(JSON.parse(localStorage.getItem("user")));
        }
    }, []);

    return (
        <UserDataContext.Provider value={{ userData, setUserData }}>
            <PercentageDoneContext.Provider value={{ percentageDone, setPercentageDone }}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<LoginScreen />} />
                        <Route path="/cadastro" element={<SignUpScreen />} />
                        <Route path="/hoje" element={<Today />} />
                        <Route path="/habitos" element={<Habits />} />
                        <Route path="/historico" element={<History />} />
                    </Routes>
                </BrowserRouter>
            </PercentageDoneContext.Provider>
        </UserDataContext.Provider>
    )
}

export default App;