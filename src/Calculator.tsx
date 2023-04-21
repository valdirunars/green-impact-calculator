import { calculateNewValue } from '@testing-library/user-event/dist/utils';
import React, { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import Header from './Header';
import ShadeButton from './ShadeButton';
import footLogo from './img/foot.svg';

const transportList = [
  ["Car", "Car"],
  ["Bus", "Bus"],
  ["TrainElectric", "Train (Electric)"],
  ["TrainDiesel", "Train (Diesel)"],
  ["Airplane", "Airplane"],
];

const dietList = [
  ["Beef","Beef"],
  ["Lamb", "Lamb"],
  ["Pork", "Pork"],
  ["Chicken", "Chicken"],
  ["FishFarmed", "Fish (Farmed)"],
  ["Eggs", "Eggs"],
  ["Milk", "Milk"],
  ["Cheese", "Cheese"],
  ["VegetablesLocal", "Vegetables (Local)"],
  ["Grains", "Grains"],
];

const energyList = [
  ["Coal", "Coal"],
  ["NaturalGas", "Natural Gas"],
  ["Oil", "Oil"],
  ["Nuclear", "Nuclear"],
  ["Wind", "Wind"],
  ["Solar", "Solar"],
  ["Hydro", "Hydro"],
  ["Biomass", "Biomass"],
  ["Geothermal", "Geothermal"],
];

const wasteList = [
  ["Paper", "Paper"],
  ["Plastic", "Plastic"],
  ["Food", "Food"],
  ["Glass", "Glass"],
];

type VM = {id: string, type: string, value: string};
type VMSetter = (vm: VM[]) => void;
type VMSection = {
  id: string,
  title: string,
  metric: string,
  optionList: string[][] // tuple with [key, readableValue] 
  show: boolean,
  vms: VM[],
  setVMs: VMSetter,
};
const Container = styled.div`
  max-width: 400px;
  margin: 0 auto;
`;

const SelectWrapper = styled.div`
  border-radius:36px;
  display:inline-block;
  overflow:hidden;
  background:#cccccc;
  border:1px solid #cccccc;
  width:200px;
  margin-right: 100px;
`;

const Select = styled.select`
  padding: 8px;
  width: 100%;
  height:40px;
  border:0px;
  outline:none;
  border-right: 8px solid transparent;
`;

const SectionHeader = styled.h2`
  font-family: 'Schibsted Grotesk';
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 25px;
  /* identical to box height */

  display: flex;
  align-items: center;
  text-align: center;

  color: #054E34;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 300px 200px;
  grid-gap: 10px;
  margin-bottom: 1em;
`;

const TextInputGrid = styled.div`
  display: grid;
  
  grid-template-columns: 86px 50px;
`;
const TextInput = styled.input.attrs({ type: 'text', })`
  width: 68px;
  padding-left: 16px;
  border-bottom-left-radius: 23px;
  border-top-left-radius: 23px;
  border: 1px solid #ccc;
`;

const TextInputLabel = styled.label`
  width: 44px;
  padding-top: 12px;
  text-align: center;
  padding-right: 8px;
  background: #F2F2F2;
  border-bottom-right-radius: 23px;
  border-top-right-radius: 23px;
  font-size: 14px;
  border: 1px solid #ccc;
`;

const NoStyleButton = styled.button`
  border: none;
  outline: inherit;
  background: none;
`;

const ResultCard = styled.div`
  margin: 0 auto;
  margin-top: 4em;
  
  gap: 25px;

  width: 275px;
  
  padding: 16px;
  

  background: #FFFFFF;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.25);
  border-radius: 37px;
`;

const ResultHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;  
`;
const ResultHeaderTitle = styled.h2`
  font-family: 'Schibsted Grotesk';
  margin-left: 15px;
  font-style: normal;
  font-weight: 600;
  font-size: 15px;
  line-height: 25px;

  
  text-align: center;
  color: #054E34;
`;

const ResultText = styled.p`
font-family: 'Schibsted Grotesk';
font-style: normal;
font-weight: 600;
font-size: 25px;
line-height: 31px;
text-align: center;
color: #054E34;
margin-block-start: 4px;
margin-block-end: 4px;
`;

const ResultSubText = styled.p`
font-family: 'Schibsted Grotesk';
font-style: normal;
font-weight: 600;
font-size: 12px;
line-height: 15px;
text-align: center;
margin-block-start: 4px;
margin-block-end: 4px;
`;


function Calculator() {

  const [searchParams] = useSearchParams();
  
  const showTransport = searchParams.get('showTransport') === 'true';
  const showWaste = searchParams.get('showWaste') === 'true';
  const showDiet = searchParams.get('showDiet') === 'true';
  const showEnergy = searchParams.get('showEnergy') === 'true';

  const [transportVMs, setTransportVMs] = useState<VM[]>([]);
  const [foodVMs, setFoodVMs] = useState<VM[]>([]);
  const [wasteVMs, setWasteVMs] = useState<VM[]>([]);
  const [energyVMs, setEnergyVMs] = useState<VM[]>([]);

  const [resultInGrams, setResultInGrams] = useState<number | undefined>();

  function calculate() {
    console.log('TRANSPORT', transportVMs);
    console.log('DIET', foodVMs);
    console.log('WASTE', wasteVMs);
    console.log('ENERGY', energyVMs);

    const body = {
      transportationSnippets: transportVMs.map(vm => ({
        transportation: vm.type,
        distancePerYearInKm: parseFloat(vm.value),
        numberOfPassengers: 1,
      })),
      foodSnippets: foodVMs.map(vm => ({
        food: vm.type,
        kgFoodPerYear: parseFloat(vm.value) / 1000,
        numberOfPeople: 1
      })),
      energySnippets: energyVMs.map(vm => ({
        energy: vm.type, kwHoursPerYear: parseFloat(vm.value), numberOfPeople: 1,
      })),
      wasteSnippets: wasteVMs.map(vm => ({
        waste: vm.type, kgPerYear: parseFloat(vm.value) / 1000,
      })),
    } 
    fetch('https://us-central1-green-impact-calculator.cloudfunctions.net/app/carbonFootprint', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    }).then(res => res.json()).then(responseData => {
      const _result = responseData.footprintInGrams;
      console.log(_result);
      setResultInGrams(_result);
    })
  }

  const sections: VMSection[] = useMemo(() => {
    return [
      {
        id: 'TransportSection',
        title: "Select Transportation Type",
        metric: 'km',
        optionList: transportList,
        show: showTransport,
        vms: transportVMs,
        setVMs: setTransportVMs,
      },
      {
        id: 'DietSection',
        title: "Select Diet Type",
        metric: 'g',
        optionList: dietList,
        show: showDiet,
        vms: foodVMs,
        setVMs: setFoodVMs,
      },
      {
        id: 'WasteSection',
        title: "Select Waste Type",
        metric: 'g',
        optionList: wasteList,
        show: showWaste,
        vms: wasteVMs,
        setVMs: setWasteVMs,
      },
      {
        id: 'EnergySection',
        title: "Select Energy Type",
        metric: 'kWh',
        optionList: energyList,
        show: showEnergy,
        vms: energyVMs,
        setVMs: setEnergyVMs,

      },
    ]
  }, [transportVMs, foodVMs, wasteVMs, energyVMs]);
  

  return (
    <div>
      <Header>Green Impact Calculator</Header>
      <Container>
        {sections.map(s => (
          <>
            {s.show && (<section key={s.id}>
            <SectionHeader>{s.title}</SectionHeader>
            {s.vms.map(vm => (
              <Grid key={vm.id}>
                <SelectWrapper>
                  <Select value={s.vms.filter(v => v.id === vm.id)[0].type} onChange={(e) => {
                    s.setVMs([
                      ...s.vms.filter(v => v.id.localeCompare(vm.id) === -1),
                      {
                        id: vm.id,
                        value: vm.value,
                        type: e.target.value,
                      } as VM,
                      ...s.vms.filter(v => v.id.localeCompare(vm.id) === 1),
                    ])
                  }}>
                    {s.optionList.map(t => (<option key={t[0]} value={t[0]}>{t[1]}</option>))}
                  </Select>
                </SelectWrapper>
                <TextInputGrid>
                  <TextInput value={s.vms.filter(v => v.id === vm.id)[0].value.replace(/\D/g,'')} onChange={(e) => {
                    s.setVMs([
                      ...s.vms.filter(v => v.id.localeCompare(vm.id) === -1),
                      {
                        id: vm.id,
                        value: e.target.value,
                        type: vm.type,
                      } as VM,
                      ...s.vms.filter(v => v.id.localeCompare(vm.id) === 1),
                    ])
                  }}/>
                  <TextInputLabel>
                    {s.metric}
                  </TextInputLabel>
                </TextInputGrid>
              </Grid>
            ))}
            <NoStyleButton onClick={() => {
              s.setVMs([
                ...s.vms,
                {
                  id: `${s.id}_${s.vms.length}`,
                  type: s.optionList[0][0], // first option key
                  value: '0',
                } as VM,
              ])
            } }>➕ Add</NoStyleButton>
            
          </section>)}
          </>
        ))}
        {typeof resultInGrams !== 'undefined' && (
          <ResultCard>
            <ResultHeader>
              <img src={footLogo} className="Bus-logo" alt="energy logo" />
              <ResultHeaderTitle>Total Carbon Footprint</ResultHeaderTitle>
            </ResultHeader>
            <ResultText>{parseFloat((resultInGrams / 1000).toFixed(4))} kg</ResultText>
            <ResultSubText>CO<sub>2</sub> equivalent</ResultSubText>
          </ResultCard>
        )}
        <ShadeButton onClick={() => calculate()}>Calculate</ShadeButton>
      </Container>
    </div>
  );
}

export default Calculator;
