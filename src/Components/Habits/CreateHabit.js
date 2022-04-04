import styled from "styled-components";
import { useState, useContext } from "react";
import UserDataContext from "../Contexts/UserDataContext";
import Day from "./Day";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";
import HabitFormContext from "../Contexts/HabitFormContext";

function CreateHabit({ setCreatingHabit }) {
    const { userData, setUserData } = useContext(UserDataContext);
    const { habitDays, setHabitDays, habit, setHabit } = useContext(HabitFormContext);
    const weekdays = ["D", "S", "T", "Q", "Q", "S", "S"];
    const [isDisabled, setIsDisabled] = useState(false);
    const [button, setButton] = useState("Salvar");

    function postHabit(ev) {
        ev.preventDefault();
        setIsDisabled(true);
        setButton(<ThreeDots color="#FFFFFF" height="11px" width="43px" />)
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
            setUserData({ ...userData });
            setHabitDays([]);
            setHabit("");
        });
        promisse.catch(() => {
            alert("Ocorreu um erro");
            setIsDisabled(false);
        });
    }

    return (
        <Creation>
            <Form onSubmit={ev => postHabit(ev)}>
                <HabitInput onChange={ev => setHabit(ev.target.value)} type="text" placeholder="nome do hábito" value={habit} disabled={isDisabled} style={{ opacity: isDisabled ? "0.7" : "1" }}></HabitInput>
                {weekdays.map((day, index) => <Day day={day} dayIndex={index} key={index} isDisabled={isDisabled}/>)}
                <CancelOrSubmit>
                    <Cancel onClick={() => setCreatingHabit(false)} disabled={isDisabled} isDisabled={isDisabled}>Cancelar</Cancel>
                    <Submit type="submit" disabled={isDisabled} style={{ opacity: isDisabled ? "0.7" : "1" }}>{button}</Submit>
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
    opacity: ${({isDisabled}) => isDisabled ? "0.7" : "1"};
`;

const Submit = styled.button`
    width: 84px;
    height: 35px;
    background: #52B6FF;
    border-radius: 4.63636px;
    border: none;
    margin-left: 8px;
    color: #FFFFFF;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export default CreateHabit;