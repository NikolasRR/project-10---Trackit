import Header from "./Header";
import styled from "styled-components";
import Footer from "./Footer";

function History () {
    return (
        <>
            <Header />
            <Main>
                <Header2>
                    <H2>Histórico</H2>
                </Header2>
                <P>Em breve você poderá ver o histórico dos seus hábitos aqui!</P>
            </Main>
            <Footer />
        </>
    )
}

const Main = styled.main`
    width: 338px;
    padding: 70px 0 101px 17px;
`;

const Header2 = styled.header`
    background-color: #FFFFFF;
    height: 74px;
    display: flex;
    align-items: center;
`;

const H2 = styled.h2`
    font-size: 22.976px;
    line-height: 29px;
    color: #126BA5;
`;

const P = styled.p`
    font-size: 17.976px;
    line-height: 22px;
    color: #666666;
`;

export default History;