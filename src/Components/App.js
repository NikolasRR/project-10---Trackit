import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import TokenContext from "./TokenContest";
import LoginScreen from "./LoginScreen";
import SignUpScreen from "./SignUpScreen";

import "../assets/css/reset.css";
import "../assets/css/style.css";

function App() {
    const [token, setToken] = useState("oi");

    return (
        <TokenContext.Provider value={{ token, setToken }}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<LoginScreen />} />
                    <Route path="/cadastro" element={<SignUpScreen />} />
                </Routes>
            </BrowserRouter>
        </TokenContext.Provider>
    )
}

export default App;