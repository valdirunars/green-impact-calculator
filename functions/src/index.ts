import * as functions from "firebase-functions";
import * as express from "express"
import { Request, Response } from "express";
import { Energy, EnergySnippet, Food, FoodSnippet, Transportation, TransportationSnippet, WasteSnippet } from "./models";
import { CarbonFootprint, YearlyEnergy, YearlyFood, YearlyTransportation, YearlyWaste } from "./carbonFootprint";


const cors = require("cors")({origin: true});


// This will crash if body isn't convertable to this type, ideally we would want to be more
// graceful in our error handling
type CarbonFootprintRequestBody = {
    transportationSnippets: TransportationSnippet[];
    foodSnippets: FoodSnippet[];
    energySnippets: EnergySnippet[];
    wasteSnippets: WasteSnippet[];
};

interface CustomRequest<T> extends Request {
    body: T
}

const app = express()
app.use(cors);

app.get("/health", (_, res) => {
    res.status(200).json({
        status: "Functions are up!",
        foodTest: new YearlyFood([
            {
                food: Food.Test,
                kgFoodPerYear: 500,
                numberOfPeople: 1,
            }
        ]).calculateFootprintInGrams() === 1_500_000,
        energyTest: new YearlyEnergy([
            {
                energy: Energy.Test,
                kwHoursPerYear: 5000,
                numberOfPeople: 2,
            }
        ]).calculateFootprintInGrams() === 1_000_000,
        transportationTest: new YearlyTransportation([
            {
                transportation: Transportation.Test,
                distancePerYearInKm: 10000,
                numberOfPassengers: 1.5,
            }
        ]).calculateFootprintInGrams() === 1_000_000,
    });
});

app.post("/carbonFootprint", (req: CustomRequest<CarbonFootprintRequestBody>, res: Response) => {
    const carbonFootprint = new CarbonFootprint();
    carbonFootprint.addConsumption(new YearlyFood(req.body.foodSnippets));
    carbonFootprint.addConsumption(new YearlyTransportation(req.body.transportationSnippets))
    carbonFootprint.addConsumption(new YearlyEnergy(req.body.energySnippets));
    carbonFootprint.addConsumption(new YearlyWaste(req.body.wasteSnippets));
    
    res.status(200).json({
        footprintInGrams: carbonFootprint.footprintInGrams,
    });
});

exports.app = functions.https.onRequest(app);