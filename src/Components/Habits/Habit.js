import axios from "axios";
import styled from "styled-components";
import { useContext } from "react";
import UserDataContext from "../Contexts/UserDataContext";

function Habit({ habit }) {
    const { userData, setUserData } = useContext(UserDataContext);
    const weekdays = ["D", "S", "T", "Q", "Q", "S", "S"];
    const { id, name, days } = habit;

    function deleteHabit() {
        if (window.confirm("Deseja excluir esse hábitos?")) {
            const url = `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}`;
            axios.delete(url,
                {
                    headers: { Authorization: `Bearer ${userData.token}` }
                })
                .then(() => setUserData({ ...userData }))
                .catch("Ocorreu um erro");
        };
    }

    return (
        <HabitDetails>
            <Details>
                <H5>{name}</H5>
                {weekdays.map((weekday, index) => {
                    if (days.includes(index)) {
                        return (<IsAHabitDay key={index}>{weekday}</IsAHabitDay>);
                    }
                    return (<IsNotAHabitDay key={index}>{weekday}</IsNotAHabitDay>);
                })}
            </Details>
            <ion-icon onClick={() => deleteHabit()} name="trash-outline" style={{
                position: "absolute",
                top: "11px",
                right: "10px"
            }}></ion-icon>
        </HabitDetails>
    );
}

const HabitDetails = styled.section`
    position: relative;
    width: 340px;
    height: 91px;
    padding: 13px 0 0 15px;
`;

const Details = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 238px;
`;

const H5 = styled.h5`
    font-size: 19.976px;
    line-height: 25px;
    color: #666666;
    width: 234px;
    padding-bottom: 8px;
`;

const IsAHabitDay = styled.div`
    width: 30px;
    height: 30px;
    background-color: #CFCFCF;
    border: 1px solid #CFCFCF;
    box-sizing: border-box;
    border-radius: 5px;
    font-size: 19.976px;
    line-height: 25px;
    color: #FFFFFF;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 4px;
`;

const IsNotAHabitDay = styled.div`
    width: 30px;
    height: 30px;
    background: #FFFFFF;
    border: 1px solid #D5D5D5;
    box-sizing: border-box;
    border-radius: 5px;
    font-size: 19.976px;
    line-height: 25px;
    color: #DBDBDB;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 4px;
`;

export default Habit;