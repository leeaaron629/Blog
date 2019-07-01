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
    TOYOTA: "Toyota", 
    FORD: "Ford"
};

class Car {

    constructor(make, model) {
        this.make = make;
        this.model = model;
    }

    contractForOwnership(terms) {
        console.log('Unknown car found');
        return null;
    }
    
    contractForLease(terms) {
        console.log('Unknown car found');
        return null;
    }

    get milesFromTripA() {
        return "Car Miles from Trip A";
    }

    get milesFromTripB() {
        return "Car Miles from Trip B";
    }
    
}

class CivicCar extends Car {

    get milesFromTripA() {
        return "Honda Civic Miles from Trip A";
    }

    get milesFromTripB() {
        return "Honda Civic Miles from Trip B";
    }

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

    get milesFromTripA() {
        return "Honda Accord Miles from Trip A";
    }

    get milesFromTripB() {
        return "Honda Accord Miles from Trip B";
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
                    console.log('Unknown Toyota car model:', car.model);
                    return new Car();
            }
        default:
            console.log('Unknown car make:', car.make);
            return new Car();
    }

}

let civicCar = new Car(CarMake.HONDA, CarModel.CIVIC);
let accordCar = new Car(CarMake.HONDA, CarModel.ACCORD);

cars = [civicCar, accordCar];

for (let i = 0; i < cars.length; i++) {
    console.log(cars[i].milesFromTripA);
    console.log(cars[i].milesFromTripB);
}

cars.map((car) => createCar(car)).forEach((car) => {
    console.log(car.milesFromTripA);
    console.log(car.milesFromTripB);
});

// createCar(accordCar).contractForOwnership(terms);