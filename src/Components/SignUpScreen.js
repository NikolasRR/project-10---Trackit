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
        setButton(<ThreeDots />);
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
                <Input disabled={isDisabled} onChange={ev => setEmail(ev.target.value)} value={email} placeholder="email" type="email" required></Input>
                <Input disabled={isDisabled} onChange={ev => setPassword(ev.target.value)} value={password} placeholder="senha" type="password" required></Input>
                <Input disabled={isDisabled} onChange={ev => setName(ev.target.value)} value={name} placeholder="nome" type="text" required></Input>
                <Input disabled={isDisabled} onChange={ev => setPhoto(ev.target.value)} value={photo} placeholder="foto" type="url" required></Input>
                <Button disabled={isDisabled} type="submit">{button}</Button>
            </Form>
            <Link to="/"><P>Já tem uma conta? Faça login!</P></Link>
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

export default SignUpScreen;