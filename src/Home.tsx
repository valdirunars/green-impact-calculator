import React, { useState } from 'react';
import busLogo from './img/transport.svg';
import wasteLogo from './img/bin.svg';
import foodLogo from './img/food.svg';
import energyLogo from './img/energy.svg';

import { useNavigate } from "react-router-dom";
import styled from 'styled-components';
import './switch.css';
import Header from './Header';
import ShadeButton from './ShadeButton';

const Grid = styled.div`
  min-height: 100%;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  max-width: 718px;
  margin: 0 auto;

`;

const Row = styled.div`
  display: flex; 
  flex-basis: calc(50% - 40px);  
  justify-content: center;
  flex-direction: column;
`;


const Card = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;

  align-items: center;

  width: 349px;
  height: 140px;

  background: #FFFFFF;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.25);
  border-radius: 37px;

  /* Inside auto layout */

  flex: none;
  order: 0;
  flex-grow: 0;
  margin-right: 10px;
  margin-bottom: 10px;
`;

const CardLayout = styled.div`
  width: 100%;
  padding: 40px;
  display: grid;
  grid-template-columns: auto 1fr 1fr;
`;

const CardLayoutImage = styled.div`
  grid-row: 1 / 3;  
`;

const CardLayoutUpper = styled.div`
  grid-row: 1;
  grid-column: 2 / 4;
  margin-left: auto;
`;

const CardLayoutLower = styled.div`
  grid-row: 2;
  grid-column: 2 / 4;
  margin-left: auto;
`;

const CardText = styled.p`
`;


{/* <input type="checkbox">
<span class="slider round"></span> */}

function Home() {

  const [transportChecked, setTransportChecked] = useState(false);
  const [wasteChecked, setWasteChecked] = useState(false);
  const [dietChecked, setDietChecked] = useState(false);
  const [energyChecked, setEnergyChecked] = useState(false);
  const navigate = useNavigate();
  return (
      <div style={{width: '100%'}}>
        <Header>
          Green Impact Calculator
        </Header>
        <Grid>
          <Row>
            <Card>
              <CardLayout>
                <CardLayoutImage>
                  <img src={busLogo} alt="transport logo" />
                </CardLayoutImage>
                <CardLayoutUpper>
                  <label className="switch">
                    <input
                      className="switchInput"
                      type="checkbox"
                      checked={transportChecked}
                      onChange={e => setTransportChecked(e.target.checked)}
                    />
                    <span className="slider round"></span>
                  </label>
                </CardLayoutUpper>
                <CardLayoutLower>
                  <CardText>Transportation</CardText>
                </CardLayoutLower>
              </CardLayout>
            </Card>
            <Card>
              
            <CardLayout>
                <CardLayoutImage>
                <img src={wasteLogo} alt="waste logo" />
                </CardLayoutImage>
                <CardLayoutUpper>
                  <label className="switch">
                    <input
                      className="switchInput"
                      type="checkbox"
                      checked={wasteChecked}
                      onChange={e => setWasteChecked(e.target.checked)}
                    />
                    <span className="slider round"></span>
                  </label>
                </CardLayoutUpper>
                <CardLayoutLower>
                  <CardText>{`Waste & Recycling`}</CardText>
                </CardLayoutLower>
              </CardLayout>
            </Card>
            
          </Row>
          <Row>
            <Card>
              <CardLayout>
                <CardLayoutImage>
                <img src={foodLogo} alt="diet logo" />
                </CardLayoutImage>
                <CardLayoutUpper>
                  <label className="switch">
                    <input
                      className="switchInput"
                      type="checkbox"
                      checked={dietChecked}
                      onChange={e => setDietChecked(e.target.checked)}
                    />
                    <span className="slider round"></span>
                  </label>
                </CardLayoutUpper>
                <CardLayoutLower>
                  <CardText>Diet</CardText>
                </CardLayoutLower>
              </CardLayout>
              
            </Card>
            <Card>
              <CardLayout>
                <CardLayoutImage>
                  <img src={energyLogo} className="Bus-logo" alt="energy logo" />
                </CardLayoutImage>
                <CardLayoutUpper>
                  <label className="switch">
                    <input
                      className="switchInput"
                      type="checkbox"
                      checked={energyChecked}
                      onChange={e => setEnergyChecked(e.target.checked)}
                    />
                    <span className="slider round"></span>
                  </label>
                </CardLayoutUpper>
                <CardLayoutLower>
                  <CardText>Energy Use</CardText>
                </CardLayoutLower>
              </CardLayout>
            </Card>
          </Row>
        </Grid>

        <ShadeButton onClick={() => {
        navigate(`/calculator?showTransport=${transportChecked}&showWaste=${wasteChecked}&showDiet=${dietChecked}&showEnergy=${energyChecked}`);
      }}>
          Next
      </ShadeButton>
      </div>
  );
}

export default Home;
