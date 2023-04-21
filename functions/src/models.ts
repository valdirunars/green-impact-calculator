// Thoughts:
// Looks like the numbers given in the project description are average emission per passenger
// for a vehicle that's constantly full
// => treating it as such. I hope this is a correct assumption 😬 otherwise all the numbers
//    will probably be wrong.

export enum Transportation {
    Car = "Car", // Car: 0.118 g CO2e/passenger-km
    Bus = "Bus", //Bus: 0.023 g CO2e/passenger-km
    TrainElectric = "TrainElectric", // (electric): 0.007 g CO2e/passenger-km
    TrainDiesel = "TrainDiesel", // (diesel): 0.059 g CO2e/passenger-km
    Airplane = "Airplane", // 0.233 g CO2e/passenger-km

    Test = "Test"
}

export const kTransportationAll = [
    Transportation.Car,
    Transportation.Bus,
    Transportation.TrainElectric,
    Transportation.TrainDiesel,
    Transportation.Airplane,
];

export enum Food {
    Beef = "Beef", // Beef: 60 kg CO2e/kg
    Lamb = "Lamb", // Lamb: 24 kg CO2e/kg
    Pork = "Pork", // Pork: 7.0 kg CO2e/kg
    Chicken = "Chicken", // Chicken: 6.0 kg CO2e/kg
    FishFarmed = "FishFarmed", // Fish (farmed): 5.0 kg CO2e/kg
    Eggs = "Eggs", // 4.8 kg CO2e/kg
    Milk = "Milk", // Milk: 1.9 kg CO2e/kg
    Cheese = "Cheese", // Cheese: 13.5 kg CO2e/kg
    VegetablesLocal = "VegetablesLocal", // Vegetables (seasonal, locally grown): 0.2 kg CO2e/kg
    Grains = "Grains", // Grains (wheat, rice, etc.): 0.8 kg CO2e/kg

    Test = "Test",
}

export const kFoodAll = [
    Food.Beef,
    Food.Lamb,
    Food.Pork,
    Food.Chicken,
    Food.FishFarmed,
    Food.Eggs,
    Food.Milk,
    Food.Cheese,
    Food.VegetablesLocal,
    Food.Grains,
];

export enum Energy {
    Coal = "Coal", // Coal: 1000 g CO2e/kWh
    NaturalGas = "NaturalGas", // ● Natural gas: 500 g CO2e/kWh
    Oil = "Oil", // ● Oil: 800 g CO2e/kWh
    Nuclear= "Nuclear", // ● Nuclear: 16 g CO2e/kWh
    Wind = "Wind", // ● Wind: 10 g CO2e/kWh
    Solar = "Solar", // ● Solar: 40 g CO2e/kWh
    Hydro = "Hydro", // ● Hydro: 24 g CO2e/kWh
    Biomass = "Biomass", // ● Biomass: 230 g CO2e/kWh
    Geothermal = "Geothermal", // ● Geothermal: 2 g CO2e/kWh

    Test = "Test",
};

export enum Waste {
    Paper = "Paper",
    Plastic = "Plastic",
    Food = "Food",
    Glass = "Glass",
};

export type FoodSnippet = {food: Food, kgFoodPerYear: number, numberOfPeople: number};

export type TransportationSnippet = {
    transportation: Transportation;
    distancePerYearInKm: number;
    numberOfPassengers: number;
};

export type EnergySnippet = {energy: Energy, kwHoursPerYear: number, numberOfPeople: number};

export type WasteSnippet = {waste: Waste, kgPerYear: number }