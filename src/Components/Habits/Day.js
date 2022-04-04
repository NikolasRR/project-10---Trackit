import styled from "styled-components";
import { useState, useContext } from "react";
import HabitFormContext from "../Contexts/HabitFormContext";

function Day({ day, dayIndex, isDisabled }) {
    const { habitDays, setHabitDays } = useContext(HabitFormContext);
    const previouslySelected = habitDays.includes(dayIndex);
    const [selected, setSelected] = useState(previouslySelected);

    function selectDay() {
        if (habitDays.includes(dayIndex)) {
            let index = habitDays.indexOf(dayIndex);
            habitDays.splice(index, 1);
            setHabitDays([...habitDays]);
            setSelected(!selected);
            return
        }
        setHabitDays([...habitDays, dayIndex]);
        setSelected(!selected);
    }

    return (
        <Weekday
            onClick={() => selectDay()}
            className={selected ? "selected" : "unselected"}
            type="button"
            disabled={isDisabled}
            style={{ background: selected ? "#CFCFCF" : "#FFFFFF", color: selected ? "#FFFFFF" : "#DBDBDB" }}
            >
            {day}
        </Weekday>
    );
}

const Weekday = styled.button`
    margin-right: 4px;
    width: 30px;
    height: 30px;
    
    border: 1px solid #D5D5D5;
    box-sizing: border-box;
    border-radius: 5px;
    
    `;

export default Day;