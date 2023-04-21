import { Energy, EnergySnippet, Food, FoodSnippet, Transportation, TransportationSnippet, Waste, WasteSnippet } from "./models";

export interface ConsumptionCalculating {
    calculateFootprintInGrams(): number
};

// Thoughts:
// Looks like the numbers given in the project description are average emission per passenger
// for a vehicle that's constantly full
// => treating it as such. I hope this is a correct assumption 😬 otherwise all the numbers
//    will probably be wrong.

function transportationEmissionFactorInGramsPerPaxKm(transportation: Transportation): number {
    // I wanted to use enums to make it easier to visualise which magic numbers are where
    // => easier to debug suspicious numbers that way
    switch (transportation) {
        case Transportation.Car:
            return 0.118;
        case Transportation.Bus:
            return 0.023; 
        case Transportation.TrainElectric:
            return 0.007;
        case Transportation.TrainDiesel:
            return 0.059;
        case Transportation.Airplane:
            return 0.233;
        case Transportation.Test:
            return 150; // from example in description
    }
}


// Separate classes for each calculation
// => I usually like to do this because it makes it allows for easy unit-testing
export class YearlyTransportation implements ConsumptionCalculating {
    
    transportationSnippets: TransportationSnippet[] = [];

    constructor(snippets: TransportationSnippet[]) {
        this.transportationSnippets = snippets;
    }

    calculateFootprintInGrams(): number {
        let totalFootPrintInGrams = 0;

        for (let snippet of this.transportationSnippets) {
            totalFootPrintInGrams += transportationEmissionFactorInGramsPerPaxKm(snippet.transportation) * snippet.distancePerYearInKm / snippet.numberOfPassengers;
        }

        return totalFootPrintInGrams;
    }
} // Todo: add unit testing for YearlyTransportation class

export function foodEmissionFactorInKgCO2PerKg(food: Food): number {
    switch (food) {
        case Food.Beef:
            return 60.0;
        case Food.Lamb:
            return 24;
        case Food.Pork:
            return 7.0;
        case Food.Chicken:
            return 6.0;
        case Food.FishFarmed:
            return 5.0;
        case Food.Eggs:
            return 4.8;
        case Food.Milk:
            return 1.9;
        case Food.Cheese:
            return 13.5;
        case Food.VegetablesLocal:
            return 0.2;
        case Food.Grains:
            return 0.8;
        case Food.Test:
            return 3; // from example in description
    }    
}

function foodEmissionFactorInGramsCO2PerKg(food: Food): number {
    return foodEmissionFactorInKgCO2PerKg(food) * 1000
}


// Separate classes for each calculation
// => I usually like to do this because it makes it allows for easy unit-testing
export class YearlyFood implements ConsumptionCalculating {
    foodConsumption: FoodSnippet[] = [];

    constructor(foodConsumption: FoodSnippet[]) {
        this.foodConsumption = foodConsumption;
    }

    calculateFootprintInGrams(): number {
        const totalFoodFootprint = this.foodConsumption.reduce((result, foodSnippet) => {
            return result + (foodEmissionFactorInGramsCO2PerKg(foodSnippet.food) * foodSnippet.kgFoodPerYear / foodSnippet.numberOfPeople);
        }, 0); // included a reduce in case you guys like it more functional 😅
        
        return totalFoodFootprint;
    }
} // Todo: add unit testing for YearlyFood class


function energyEmissionFactorInGramsCO2PerKWHours(energy: Energy) {
    switch (energy) {
        case Energy.Coal:
            return 1_000;
        case Energy.NaturalGas:
            return 500;
        case Energy.Oil:
            return 800;
        case Energy.Nuclear:
            return 16;
        case Energy.Wind:
            return 10;
        case Energy.Solar:
            return 40
        case Energy.Hydro:
            return 24;
        case Energy.Biomass:
            return 230;
        case Energy.Geothermal:
            return 2;
        case Energy.Test:
            return 400; // from example in description
    }
}

// Separate classes for each calculation
// => I usually like to do this because it makes it allows for easy unit-testing
export class YearlyEnergy implements ConsumptionCalculating {
    energyConsumption: EnergySnippet[] = [];

    constructor(energyConsumption: EnergySnippet[]) {
        this.energyConsumption = energyConsumption;
    }

    calculateFootprintInGrams(): number {
        // (Total energy consumption per year x
        // Emission factor for energy) / Number of people

        let totalFootprintInGrams = 0;

        // Emission factor for each transportation seemed to already take into account passengers (e.g. passenger-km above)
        // so I skipped the averagePassengers bit described in the formula from the project description and used number of
        // passengers in the calculation for each transportation snippet instead (I hope the calculation is correct 😬)
        for (const snippet of this.energyConsumption) {
            totalFootprintInGrams += energyEmissionFactorInGramsCO2PerKWHours(snippet.energy) * snippet.kwHoursPerYear / snippet.numberOfPeople;
        }

        return totalFootprintInGrams;
    }
} // Todo: add unit testing for YearlyEnergy class


function wasteEmissionFactorInGramsCO2PerKg(waste: Waste): number {
    switch (waste) {
        case Waste.Food:
            return 620;
        case Waste.Glass:
            return 480;
        case Waste.Plastic:
            return 6_000;
        case Waste.Paper:
            return 1_370;
        // case "Test":
        //     test for this was missing in description :(
    }
}

export class YearlyWaste implements ConsumptionCalculating {
    wasteConsumption: WasteSnippet[] = [];

    constructor(wasteConsumption: WasteSnippet[]) {
        this.wasteConsumption = wasteConsumption;
    }

    calculateFootprintInGrams(): number {
        let totalFootprintInGrams = 0;
        for (const snippet of this.wasteConsumption) {
            totalFootprintInGrams += wasteEmissionFactorInGramsCO2PerKg(snippet.waste) * snippet.kgPerYear;
        }
        return totalFootprintInGrams;
    }
}

export class CarbonFootprint {
   footprintInGrams: number = 0;

   addConsumption(consumptionCalculating: ConsumptionCalculating): void {
    this.footprintInGrams += consumptionCalculating.calculateFootprintInGrams();
   }
} // Todo: add unit testing for add methods
