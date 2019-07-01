
const CarModel = {
    CIVIC: "Civic",
    CR_V: "CR_V",
    ACCORD: "Accord",
    PRIUS: "Prius",
    COROLLA: "Corolla",
    AVALON: "Avalon"  
}

const CarMake = {
    HONDA: "Honda",
    TOYATA: "Toyata", 
    FORD: "Ford"
};

class Car {

    constructor(carMake) {
        this.carMake = carMake;
    }

    get milesFromTripA() {
        return "Car Miles from Trip A";
    }

    get milesFromTripB() {
        return "Car Miles from Trip B";
    }
    
}

class HondaCar extends Car {

    constructor() {
        super(CarMake.HONDA);
    }

    get milesFromTripA() {
        return "Honda Car Miles from Trip A";
    }

    get milesFromTripB() {
        return "Honda Car Miles from Trip B";
    }


}

let carOne = new Car(CarMake.HONDA);

let carTwo = new HondaCar();

cars = [carOne, carTwo];

for (let i = 0; i < cars.length; i++) {
    console.log(cars[i].milesFromTripA);
    console.log(cars[i].milesFromTripB);
}

class AccordCar extends Car {

    contractForOwnership(terms) {

        let contract = new Contract();

        contract.initialCost = this.msrp - terms.discount;
        contract.additionalCost = terms.additionalAddons.reduce((item, acc) => {return getCost(item) + acc});
        
        return contract;
    }
    
    contractForLease(terms) {

        let contract = new Contract();

        contract.yearsToLease = terms.yearsToLease;
        contract.milesAllowed = terms.yearsToLease * this.yearlyExpectedMiles;
        
        
        contract.initialCost = 
            (terms.yearsToLease * this.yearlyLeaseRate) 
            + this.initialLeaseCost
            - terms.discount;
        contract.additionalCost = terms.additionalAddons.reduce((item, acc) => {return getCost(item) + acc});

        return contract;
    
    }
    
}

function createCar(car) {

    switch (car.make) {
        case CarMake.HONDA:
            switch (car.model) {
                case CarModel.CIVIC:
                        return new CivicCar();
                case CarModel.CR_V:
                        return new CrvCar();
                case CarModel.ACCORD:
                        return new AccordCar();
                default:
                    console.log('Unknown Honda car model: ', car.model);
                    return new Car();
            }
        case CarMake.TOYOTA:
            switch (car.model) {
                case CarModel.PRIUS:
                    return new PriusCar();
                case CarModel.COROLLA:
                    return new CorollaCar();
                case CarModel.AVALON:
                    return new AvalonCar();
                default:
                    console.log('Unknown Toyata car model:', car.model);
                    return new Car();
            }
        default:
            console.log('Unknown car make:', car.make);
            return new Car();
    }

}

createCar(car).contractForOwnership(terms);