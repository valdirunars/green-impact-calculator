import styled from "styled-components";

const _Header = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 10pt;
    margin-bottom: 2em;
    gap: 10px;

    background: linear-gradient(180deg, #5DDEAE 0%, #1F815C 100%);
    border-radius: 0px 0px 37px 37px;

    /* Inside auto layout */

    flex: none;
    order: 0;
    flex-grow: 0;
`;

type Props = {
    children: string
}

const Title = styled.h1`
    font-family: 'Schibsted Grotesk';
    font-style: normal;
    font-weight: 600;
    font-size: 30px;
    line-height: 37px;
    /* identical to box height */
    color: #FFFFFF;
`;

const Header = ({children}: Props) => {
    return <_Header>
        <Title>{children}</Title>
    </_Header>
} 

export default Header;