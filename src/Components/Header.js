import UserDataContext from "./UserDataContext";
import {useState, useContext} from "react";
import styled from "styled-components";

function Header () {
    const {userData, setUserData} = useContext(UserDataContext);
    console.log(userData);
    return (
        <HeaderB>
            <H1>TrackIt</H1>
            <Photo src={userData.image}/>
        </HeaderB>
    )
}

const HeaderB = styled.header`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 70px;
    background-color: #126BA5;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const H1 = styled.h1`
    font-family: 'Playball', cursive;
    font-size: 38.982px;
    line-height: 49px;
    padding-left: 16px;
`;

const Photo = styled.img`
    width: 51px;
    border-radius: 98.5px;
    margin-rigth: 50px;
`;

export default Header;