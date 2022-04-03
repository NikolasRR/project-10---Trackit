import styled from "styled-components";
import check from "../../assets/imgs/check.png";
import {useState, useContext} from "react";
import axios from "axios";
import UserDataContext from "../UserDataContext";

function TodaysHabit ({habit}) {
    console.log(habit)
    const {userData} = useContext(UserDataContext);
    const {id, name, done, currentSequence, highestSequence} = habit;
    const [checked, setChecked] = useState(done);

    function checkOrUncheck () {
        if (!checked) {
            console.log(id);
            console.log(userData.token);
            const url = `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/check`;
            axios.post(url, 
                {
                    headers: { Authorization: `Bearer ${userData.token}` }
                })
                .then(() => setChecked(!check))
                .catch(() => alert("Algo deu errado, por favor recarregue a página e tente novamente"));
        }
    }

    return (
        <OneHabit>
            <Info>
                <H5>{name}</H5>
                <P>Sequência atual: {currentSequence} dia(s)</P>
                <P>Seu recorde: {highestSequence} dia(s)</P>
            </Info>
            <Checkbox onClick={() => checkOrUncheck()} style={{background: checked ? "#8FC549" : "#FFFFFF"}}>
                <img src={check}/>
            </Checkbox>
        </OneHabit>
    )
}

const OneHabit = styled.section`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 340px;
    height: 94px;
    margin-left: 17.5px;
`;

const Info = styled.div`
    margin-left: 14px;
`;

const H5 = styled.h5`
    font-size: 19.976px;
    line-height: 25px;
    margin-bottom: 7px;
    color: #666666;
`;

const P = styled.p`
    font-size: 12.976px;
    line-height: 16px;
    color: #666666;
`;

const Checkbox = styled.div`
    width: 69px;
    height: 69px;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 14px;
`;

export default TodaysHabit;