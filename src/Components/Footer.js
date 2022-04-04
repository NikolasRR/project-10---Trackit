import styled from "styled-components";
import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import PercentageDoneContext from "./Contexts/PercentageDoneContext";
import UserDataContext from "./Contexts/UserDataContext";
import axios from "axios";

function Footer() {
    const { percentageDone, setPercentageDone } = useContext(PercentageDoneContext);
    const {userData} = useContext(UserDataContext);

    useEffect(() => {
        if (userData.token !== undefined) {
            const promisse = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today",
                {
                    headers: { Authorization: `Bearer ${userData.token}` }
                });
            promisse.then(serverAnswer => {
                let count = 0;
                serverAnswer.data.forEach(habit => {
                    if (habit.done) {
                        count = count + 1;
                    }
                })
                setPercentageDone(count / (serverAnswer.data).length);
            });
            promisse.catch(error => console.log(error.response.status));
        }
    }, [userData]);

    return (
        <FooterB>
            <Div>
                <StyledLink to="/habitos"><H4>Hábitos</H4></StyledLink>
                <DivB>
                    <CircularProgressbarWithChildren background={true} backgroundPadding={6} value={percentageDone * 100} styles={buildStyles({
                        pathTransitionDuration: 1,
                        pathColor: `white`,
                        backgroundColor: `#52B6FF`,
                        trailColor: `#52B6FF`,
                        fontFamily: `'Lexend Deca', sans-serif`,
                        height: `91px`
                    })}>
                        <StyledLink to="/hoje"><P>Hoje</P></StyledLink>
                    </CircularProgressbarWithChildren>
                </DivB>
                <StyledLink to="/historico"><H4>Histórico</H4></StyledLink>
            </Div>
        </FooterB>
    )
}

const FooterB = styled.footer`
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;    
    height: 70px;
    display: flex;
    justify-content: center;
    background-color: #FFFFFF;
`;

const Div = styled.div`
    width: 299px;
    height: 70px;
    display: flex;
    text-align: center;
    justify-content: space-between;
`;

const DivB = styled.div`
position: relative;
    height: 91px;
    width: 91px;
    position: fixed;
    bottom: 10px;
    left: calC(50% - 45.5px);
`;

const H4 = styled.h4`
    text-decoration: none;
    height: 70px;
    display: flex;
    align-items: center;
    color: #52B6FF;
`;

const P = styled.p`
    font-size: 17.976px;
    line-height: 22px;
    color: #FFFFFF;
`;

const StyledLink = styled(Link)`
    text-decoration: none;
    color: inherit;
    font-family: 'Lexend Deca', sans-serif;
`;

export default Footer;