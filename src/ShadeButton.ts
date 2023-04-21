import styled from "styled-components";

const ShadeButton = styled.button`
/* Auto layout */
display: block;
margin: auto;
margin-top: 4em;
margin-bottom: 4em;


paddingTop: 8px;
text-align: center;

width: 184px;
height: 39px;

background: linear-gradient(180deg, #5DDEAE 0%, #1F815C 100%);
border-radius: 37px;

/* Inside auto layout */


order: 2;
flex-grow: 0;
font-family: 'Schibsted Grotesk';
font-style: normal;
font-weight: 600;
font-size: 15px;
line-height: 19px;
/* identical to box height */


color: #FFFFFF;
`;

export default ShadeButton;