import styled from "styled-components";
import check from "../../assets/imgs/check.png";
import {useState, useContext} from "react";
import axios from "axios";
import UserDataContext from "../Contexts/UserDataContext";

function TodaysHabit ({habit}) {
    const {userData, setUserData} = useContext(UserDataContext);
    const {id, name, done, currentSequence, highestSequence} = habit;
    const [checked, setChecked] = useState(done);

    function checkOrUncheck () {
        let urlEnd;
        if (!checked) {
            urlEnd = "check";
        }
        if (checked) {
            urlEnd = "uncheck";
        }
        const checkIt = urlEnd === "check";
        setChecked(checkIt);
        const url = `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/${urlEnd}`;
            axios.post(url, {}, 
                {
                    headers: { Authorization: `Bearer ${userData.token}` }
                })
                .then(() => {
                    
                    setUserData({...userData});
                })
                .catch(() => alert("Algo deu errado, por favor recarregue a página e tente novamente"));
    }

    const newRecord = currentSequence >= highestSequence;

    return (
        <OneHabit>
            <Info>
                <H5>{name}</H5>
                <P>Sequência atual: <span style={{color: checked || newRecord ? "#8FC549" : "#666666"}}>{currentSequence} dia(s)</span></P>
                <P>Seu recorde: <span style={{color: checked || newRecord ? "#8FC549" : "#666666"}}>{highestSequence} dia(s)</span></P>
            </Info>
            <Checkbox onClick={() => checkOrUncheck()} style={{background: checked ? "#8FC549" : "#FFFFFF"}}>
                <img src={check} alt="check"/>
            </Checkbox>
        </OneHabit>
    )
}

const OneHabit = styled.section`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 340px;
    min-height: 94px;
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
    max-width: 220px;
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