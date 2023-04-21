import { FoodSnippet } from "./models";
import { Food, kFoodAll, kTransportationAll, Transportation } from "./models";

export function isNumber(x: any): x is number {
    return typeof x === "number";
}
   
export function isString(x: any): x is string {
    return typeof x === "string";
}

export function isValidTransportation(x: any): x is Transportation {
    return kTransportationAll.includes(x);
}

export function isValidFood(x: any): x is Food {
    return kFoodAll.includes(x);
}

export function isValidFoodSnippet(x: any): x is FoodSnippet {
    if (typeof x.food === "undefined" || typeof x.kgFoodPerYear === "undefined") {
        return false;
    }
    return isValidFood(x.food);
}
