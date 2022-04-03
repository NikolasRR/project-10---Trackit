import styled from "styled-components";
import { useState, useContext } from "react";
import UserDataContext from "../UserDataContext";
import Day from "./Day";
import axios from "axios";

function CreateHabit( {setCreatingHabit}) {
    const { userData, setUserData } = useContext(UserDataContext);
    const weekdays = ["D", "S", "T", "Q", "Q", "S", "S"];
    const [habitDays, setHabitDays] = useState([]);
    const [habit, setHabit] = useState("");

    console.log(userData.token);

    function postHabit(ev) {
        ev.preventDefault();
        const promisse = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits",
            {
                name: habit,
                days: habitDays
            },
            {
                headers: { Authorization: `Bearer ${userData.token}` }
            });
        promisse.then(() => {
            setCreatingHabit(false);
            setUserData({...userData});
        });
        promisse.catch(() => alert("Ocorreu um erro"));
    }

    return (
        <Creation>
            <Form onSubmit={ev => postHabit(ev)}>
                <HabitInput onChange={ev => setHabit(ev.target.value)} type="text" placeholder="nome do hábito" value={habit}></HabitInput>
                {weekdays.map((day, index) => <Day day={day} dayIndex={index} key={index} habitDays={habitDays} setHabitDays={setHabitDays} />)}
                <CancelOrSubmit>
                    <Cancel onClick={() => setCreatingHabit(false)}>Cancelar</Cancel>
                    <Submit type="submit">Salvar</Submit>
                </CancelOrSubmit>
            </Form>
        </Creation>
    )
}

const Creation = styled.section`
    display: flex;
    justify-content: center;
    padding-top: 20px;
`;

const Form = styled.form`
    width: 303px;
`;

const HabitInput = styled.input`
    width: 303px;
    height: 45px;
    color: #666666;
    border: 1px solid #D5D5D5;
    box-sizing: border-box;
    border-radius: 5px;
    margin-bottom: 8px;
`;

const CancelOrSubmit = styled.div`
    padding-top: 29px;
    width: 303px;
    display: flex;
    justify-content: flex-end;
`;

const Cancel = styled.button`
    color: #52B6FF;
    width: 84px;
    height: 35px;
    border: none;
`;

const Submit = styled.button`
    width: 84px;
    height: 35px;
    background: #52B6FF;
    border-radius: 4.63636px;
    border: none;
    margin-left: 8px;
    color: #FFFFFF;
`;

export default CreateHabit;