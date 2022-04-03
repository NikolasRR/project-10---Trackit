import styled from "styled-components";
import {Link, useNavigate} from "react-router-dom";
import { useContext, useState } from "react";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";

import logo from "../assets/imgs/logo.png"
import UserDataContext from "./UserDataContext";

function LoginScreen () {
    let navigate = useNavigate();
    const {userData, setUserData} = useContext(UserDataContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isDisabled, setIsDisabled] = useState(false);
    const [button, setButton] = useState("Entrar");

    function Login (ev) {
        ev.preventDefault();
        setButton(<ThreeDots/>);
        setIsDisabled(true);
        const promisse = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login", 
        {
            email: email,
            password: password
        });
        promisse.then(serverAnswer => {
            setUserData(serverAnswer.data);
            localStorage.setItem("user", JSON.stringify(serverAnswer.data));
            navigate("/hoje");
        });
        promisse.catch(error => {
            if (error.response.status === 401) {
                alert("senha incorreta");
                setButton("Entrar");
                setIsDisabled(false);
                return;
            }
            alert("Verifique o email informado, ou tente novamente mais tarde");
            setButton("Entrar");
            setIsDisabled(false);
        })
    }

    return (
        <Container>
            <Photo src={logo} alt="logo"/>
            <Form onSubmit={ev => Login(ev)}>
                <Input onChange={ev => setEmail(ev.target.value)} disabled={isDisabled} value={email} placeholder="email" type="text"></Input>
                <Input onChange={ev => setPassword(ev.target.value)} disabled={isDisabled} value={password} placeholder="senha" type="password"></Input>
                <Button type="submit" disabled={isDisabled}>{button}</Button>
            </Form>
            <StyledLink to="/cadastro"><P>Não tem uma conta? Cadastre-se!</P></StyledLink>
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
    height: 45px;
    margin-bottom: 6px;
    border: none;
    color: #666666;
`;

const Button = styled.button`
    width: 303px;
    height: 45px;
    margin-bottom: 25px;
    background: #52B6FF;
    border-radius: 4.63636px;
    border: none;
    color: #FFFFFF;
`;

const P = styled.p`
    font-size: 13.976px;
    line-height: 17px;
`;

const StyledLink = styled(Link)`
    text-decoration: none;
    color: #52B6FF;
`;

export default LoginScreen;