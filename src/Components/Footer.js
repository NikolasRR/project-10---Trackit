import styled from "styled-components";
import { Link } from "react-router-dom";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

function Footer() {
    const percentage = 60;
    return (
        <FooterB>
            <Div>
                <StyledLink to="/habitos"><H4>Hábitos</H4></StyledLink>
                <DivB>
                    <CircularProgressbar background={true} backgroundPadding={6} value={percentage} text="Hoje" styles={buildStyles({
                        pathTransitionDuration: 1,
                        pathColor: `white`,
                        backgroundColor: `#52B6FF`,
                        textSize: `18px`,
                        lineHeight: `22px`,
                        textColor: `white`,
                        trailColor: `#52B6FF`,
                        fontFamily: `'Lexend Deca', sans-serif`,
                        height: `91px`
                    })} />
                </DivB>
                <StyledLink to="/historico"><H4>Histórico</H4></StyledLink>
            </Div>
        </FooterB>
    )
}

const FooterB = styled.footer`
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;    
    height: 70px;
    display: flex;
    justify-content: center;
    background-color: #FFFFFF;
`;

const Div = styled.div`
    width: 299px;
    height: 70px;
    display: flex;
    text-align: center;
    justify-content: space-between;
`;

const DivB = styled.div`
    height: 91px;
    width: 91px;
    position: fixed;
    bottom: 10px;
    left: calC(50% - 45.5px);
`;

const H4 = styled.h4`
    text-decoration: none;
    height: 70px;
    display: flex;
    align-items: center;
    font-family: 'Lexend Deca', sans-serif;
`;

const StyledLink = styled(Link)`
    text-decoration: none;
    color: #52B6FF;
`;

export default Footer;