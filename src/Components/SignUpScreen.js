import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";

import logo from "../assets/imgs/logo.png"

function SignUpScreen() {
    let navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [photo, setPhoto] = useState("");
    const [isDisabled, setIsDisabled] = useState(false);
    const [button, setButton] = useState("Cadastrar");

    function SignUp (ev) {
        ev.preventDefault();
        setIsDisabled(true);
        setButton(<ThreeDots color="#FFFFFF" height="13px" width="51px"/>);
        const promisse = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up", 
        {
            email: email,
            name: name,
            image: photo,
            password: password
        });
        promisse.then(serverAnswer => {
            alert("Conta criada!")
            navigate("/");
        });
        promisse.catch(error => {
            if (error.response.status === 409) {
                alert("O e-mail informado já está em uso");
                setIsDisabled(false);
                setButton("Cadastrar");
                return;
            }
            alert("Certifique-se que preencheu os campos corretamente, ou tente novamente mais tarde");
            setIsDisabled(false);
            setButton("Cadastrar");
        })
    }
    
    return (
        <Container>
            <Photo src={logo} alt="logo" />
            <Form onSubmit={(ev) => SignUp(ev)}>
                <Input disabled={isDisabled} onChange={ev => setEmail(ev.target.value)} value={email} placeholder="email" style={{opacity: isDisabled ? "0.7" : "1"}} type="email" required></Input>
                <Input disabled={isDisabled} onChange={ev => setPassword(ev.target.value)} value={password} placeholder="senha" style={{opacity: isDisabled ? "0.7" : "1"}} type="password" required></Input>
                <Input disabled={isDisabled} onChange={ev => setName(ev.target.value)} value={name} placeholder="nome" style={{opacity: isDisabled ? "0.7" : "1"}} type="text" required></Input>
                <Input disabled={isDisabled} onChange={ev => setPhoto(ev.target.value)} value={photo} placeholder="foto" style={{opacity: isDisabled ? "0.7" : "1"}} type="url" required></Input>
                <Button disabled={isDisabled} type="submit" style={{opacity: isDisabled ? "0.7" : "1"}}>{button}</Button>
            </Form>
            <StyledLink to="/"><P>Já tem uma conta? Faça login!</P></StyledLink>
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
    display: flex;
    justify-content: center;
    align-items: center;
`;

const P = styled.p`
    font-size: 13.976px;
    line-height: 17px;
`;

const StyledLink = styled(Link)`
    text-decoration: none;
    color: #52B6FF;
`;


export default SignUpScreen;