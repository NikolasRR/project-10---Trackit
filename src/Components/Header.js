import UserDataContext from "./Contexts/UserDataContext";
import { useContext } from "react";
import styled from "styled-components";

function Header() {
    const { userData } = useContext(UserDataContext);

    return (
        <HeaderB>
            <Div>
                <H1>TrackIt</H1>
                <Photo src={userData.image} />
            </Div>
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
    z-index: 2;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
`;

const Div = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 0 18px;
`;

const H1 = styled.h1`
    font-family: 'Playball', cursive;
    font-size: 38.982px;
    line-height: 49px;
    color: #FFFFFF;
`;

const Photo = styled.img`
    width: 51px;
    border-radius: 98.5px;
`;

export default Header;