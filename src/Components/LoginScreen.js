import styled from "styled-components";
import {Link} from "react-router-dom";
import { useContext, useState } from "react";
import axios from "axios";

import logo from "../assets/imgs/logo.png"
import TokenContext from "./TokenContest";

function LoginScreen () {
    const {token, setToken} = useContext(TokenContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isDisabled, setIsDisabled] = useState(false);
    const [button, setButton] = useState("Entrar");

    function Login (ev) {
        ev.preventDefault();
        const promisse = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login", 
        {
            email: email,
            password: password
        });
        promisse.then(serverAnswer => console.log(serverAnswer))
    }

    return (
        <Container>
            <Photo src={logo} alt="logo"/>
            <Form onSubmit={ev => Login(ev)}>
                <Input onChange={ev => setEmail(ev.target.value)} disabled={isDisabled} value={email} placeholder="email" type="text"></Input>
                <Input onChange={ev => setPassword(ev.target.value)} disabled={isDisabled} value={password} placeholder="senha" type="password"></Input>
                <Button type="submit" disabled={isDisabled}>{button}</Button>
            </Form>
            <Link to="/cadastro"><P>Não tem uma conta? Cadastre-se!</P></Link>
        </Container>
    )
}

const Container = styled.div`
    margin: 0 auto;
    width: 375px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
`;

const Photo = styled.img`
    width: 180px;
    padding: 68px 0 33px 0;
`;

const Form = styled.form`
    width: 303px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
`;

const Input = styled.input`
    width: 303px;
    heigth: 45px;
    margin-bottom: 6px;
`;

const Button = styled.button`
    width: 303px;
    heigth: 45px;
    margin-bottom: 25px;
`;

const P = styled.p`
    font-size: 13.976px;
    line-height: 17px;
`;

export default LoginScreen;