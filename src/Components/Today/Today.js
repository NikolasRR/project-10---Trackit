import Header from "../Header";
import dayjs from "dayjs";
import styled from "styled-components";
import axios from "axios";
import UserDataContext from "../Contexts/UserDataContext";
import PercentageDoneContext from "../Contexts/PercentageDoneContext";
import { useEffect, useContext, useState } from "react";
import Footer from "../Footer";
import TodaysHabit from "./TodaysHabit";

function Today() {
    const weekday = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];
    const { userData } = useContext(UserDataContext);
    const { percentageDone, setPercentageDone } = useContext(PercentageDoneContext);
    const [habits, setHabits] = useState([]);

    useEffect(() => {
        if (userData.token !== undefined) {
            const promisse = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today",
                {
                    headers: { Authorization: `Bearer ${userData.token}` }
                });
            promisse.then(serverAnswer => 
                setHabits(serverAnswer.data)
                );
            promisse.catch(error => console.log(error.response.status));
        }
    }, [userData]);

    return (
        <>
            <Header />
            <Div>
                <H2>
                    {weekday[dayjs().day()]}, {dayjs().date().toString().padStart(2, '0')}/{(dayjs().month() + 1).toString().padStart(2, '0')}
                </H2>
                <P style={{color: percentageDone === 0 ? "#BABABA" : "#8FC549"}}>{percentageDone === 0 ? "Nenhum hábito concluído ainda" : `${Math.floor(percentageDone*100)}% dos hábitos concluídos`}</P>
            </Div>
            <Main>
                {habits.map((habit, index) => <TodaysHabit habit={habit} key={index} />)}
            </Main>
            <Footer />
        </>
    )
}

const Div = styled.div`
    position: fixed;
    top: 70px;
    left: 0;
    right: 0;
    background-color: #FFFFFF;
`;

const H2 = styled.h2`
    font-size: 22.976px;
    line-height: 29px;
    color: #126BA5;
    font-family: 'Lexend Deca', sans-serif;
    padding: 28px 0 0 17px;
`;

const P = styled.p`
    font-size: 17.976px;
    line-height: 22px;
    color: #BABABA;
    font-family: 'Lexend Deca', sans-serif;
    padding-left: 17px;
`;

const Main = styled.main`
    margin: 177px 0 105px 0;
`;

export default Today;