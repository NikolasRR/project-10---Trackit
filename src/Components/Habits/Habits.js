import Footer from "../Footer";
import Header from "../Header";
import CreateHabit from "./CreateHabit";
import { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import UserDataContext from "../UserDataContext";
import axios from "axios";
import Habit from "./Habit";

function Habits() {
    const { userData } = useContext(UserDataContext);
    const [creatingHabit, setCreatingHabit] = useState(false);
    const [allHabits, setAllHabits] = useState([]);

    useEffect(() => {
        if (userData.token !== undefined) {
            axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits",
                {
                    headers: { Authorization: `Bearer ${userData.token}` }
                })
                .then(serverAnswer => {
                    setAllHabits(serverAnswer.data)
                    console.log(serverAnswer)
                })
                .catch(() => alert("sou o rei do erro de servidor"));
        }
    }, [userData]);

    let noHabits = allHabits.length === 0;

    return (
        <>
            <Header />
            <Main>
                <Header2>
                    <H2>Meus hábitos</H2>
                    <Button onClick={() => setCreatingHabit(true)}>+</Button>
                </Header2>
                <UsersHabits>
                    {
                        !creatingHabit && noHabits &&
                        <P>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</P>
                    }
                    {
                        creatingHabit &&
                        <>
                            <CreateHabit setCreatingHabit={setCreatingHabit} />
                            {allHabits.map((habit, index) => <Habit key={index} habit={habit} />)}
                        </>
                    }
                    {
                        !creatingHabit && !noHabits &&
                        allHabits.map((habit, index) => <Habit key={index} habit={habit} />)
                    }

                </UsersHabits>
            </Main>
            <Footer />
        </>
    )
}

const Main = styled.main`
    padding: 118px 0 101px 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`;

const Header2 = styled.section`
    position: fixed;
    top: 70px;
    left: 17px;
    right: 10px;
    padding: 26px 0;
    display: flex;
    justify-content: space-between;
    background-color: #FFFFFF;
    z-index: 2;
`;

const H2 = styled.h2`
    font-size: 22.976px;
    line-height: 29px;
    color: #126BA5;
`;

const Button = styled.button`
    width: 40px;
    height: 35px;
    background-color: #52B6FF;
    font-size: 26.976px;
    line-height: 34px;
    color: #FFFFFF;
    border: none;
    border-radius: 4.63636px;
`;

const UsersHabits = styled.section`
    width: calc(100vw - 36px);
    padding-top: 28px;
`;

const P = styled.p`
    padding-top: 28px;
    font-size: 17.976px;
    line-height: 22px;
    color: #666666;
`;

export default Habits;