# Dealing with Deep Nested Code (Part 2)

Hi! Welcome to part 2 of Dealing with Deep Nested Code. In part 1, we went over some methods on keeping nesting to a minimum by simply re-structuring the code through guard clauses and method decomposition. However, we still ended up using conditionals. Today we will go over approaches that do not use conditionals at all. This way we are avoiding conditionals instead of moving it elsewhere.

### Table-Driven Methods

Table-driven methods, as the name suggests, uses indexed tables (Arrays) and HashTables (Maps) as look-up tables.

Let's take a look at the following code to see what it can do:

```javascript
function getCarPrice(car) {

    switch (car.make) {
        case HONDA:
            switch(car.model) {
                case CIVIC:
                    if (car.year < 2000) {
                        return 4000;
                    } else if (car.year < 2010) {
                        return 7500;
                    } else if (car.year >= 2010) {
                        return 10000;
                    }
                case CR_V:
                    if (car.year < 2000) {
                        return 6500;
                    } else if (car.year < 2010) {
                        return 9000;
                    } else if (car.year >= 2010) {
                        return 12000;
                    }
                case ACCORD:
                    if (car.year < 2000) {
                        return 5000;
                    } else if (car.year < 2010) {
                        return 8000;
                    } else if (car.year >= 2010) {
                        return 11000;
                    }
                default:
                    console.log('Invalid car model:', model);
                    return 0;
            }
        case TOYATA:
            switch(car.model) {
                case PRIUS:
                    if (car.year < 2000) {
                        return 5000;
                    } else if (car.year < 2010) {
                        return 8250;
                    } else if (car.year >= 2010) {
                        return 11500;
                    }
                case COROLLA:
                    if (car.year < 2000) {
                        return 4500;
                    } else if (car.year < 2010) {
                        return 8000;
                    } else if (car.year >= 2010) {
                        return 10500;
                    }
                case AVALON:
                    if (car.year < 2000) {
                        return 6000;
                    } else if (car.year < 2010) {
                        return 9000;
                    } else if (car.year >= 2010) {
                        return 12500;
                    }
                default:
                    console.log('Inavlid car model:', model);
                    return 0;
            }
      
        default:
            console.log('Invalid car make:', make);
            return 0;
    }

}
```

What a mess right? Now imagine doing all of that in one line of code. Impossible right?

```javascript
carPriceLookupMap[car1.make][car1.model][getYearKey(car1.year)];
```

Well, there it is! One line of code.

I'm kidding, here's the rest of the code...

```javascript
// Feel free to try this out in the browser

// The magic!
const carPriceLookUpTable = {
    Toyata: {
        Prius: [5000,8250,11500],
        Corolla: [4500, 8000, 10500],
        Avalon: [6000, 9000, 12500]
    },
    Honda: {
        Civic: [4000, 7500, 10000],
        CR_V: [6500, 9000, 12000],
        Accord: [5000, 8000, 11000]
    }
}

// Helper function
function getYearKey(carYear) {
    if (carYear < 2000) {
        return 0;
    } else if (carYear < 2010) {
        return 1;
    } else {
        return 2;
    }
}

// Test Data
const car = {
    make: HONDA,
    model: CIVIC,
    year: 1999
}

// The primary logic
console.log(carPriceLookUpTable[car.make][car.model][getYearKey(car.year)]);
```

Not exactly a one-liner, but the intention and logic are much more clear than the first. Let's take an in-depth look at how this works.

The essence of this problem is classifying an object and applying the corresponding logic to it. So, in a look-up table, we use properties of the object as keys and indices. By doing this, the correct logic can be stored with its corresponding indices. During, run-time we find the appropriate logic through the object's properties.

Here's a simpler version of the above example:

```javascript
const toyataCarModelPriceLookUpTable = {
    Prius: 25000,
    Corolla: 22000,
    Avalon: 30000
};

let priusCarPrice = toyataCarModelPriceLookUpTable['Prius'];
```

The car model's name is used as a key with no transformation needed. However, this is not always the case. Sometimes the key or index to use is not always easily determined.

Here's an example with used cars:

With a range of years, we need the following helper function to assign a key.

```javascript
// Helper function
function getYearKey(carYear) {
    if (carYear < 2000) {
        return 0;
    } else if (carYear < 2010) {
        return 1;
    } else {
        return 2;
    }
}

const usedPriusCarPriceLookUpTable = [5000,8250,11500]
```

Used cars have ranges of years and it doesn't start at 0, making it very hard to use with arrays. We can use a hash table, with the year as keys. However, we would probably have to convert the years to strings. This doesn't sound quite right for me, so I prefer to use an indexed table with a helper function.

In the helper function above, we transformed the ranges of years to an index. Then we take this index and use it to determine the corresponding logic.

There are other approaches as well. Here's one, with a different take on the helper function:

```javascript
function getYearKeyV2(carYear) {
    return Math.max(1999, Math.min(carYear, 2010)) - 1999;
}

const usedPriusCarPriceLookUpTable = [5000, 8250, 8250, 8250, 8250, 8250, 8250, 8250, 8250, 8250, 8250, 11500];
```

Here we changed the way we key or index the table. Instead of using a conditional we used an expression to determine the index. As a result, we have to duplicate the values from 2000 - 2009 and subtract 1999 for it to work. Each of the methods above works great and it truly depends on the situations and your preferences.

At the end of the day, table-driven methods do take more space, but the gain in readability and maintainability is well worth the trade-off. The challenge that comes with table-driven methods is figuring out how to key or index the table. Not every case is simple, but once figured out the rest follows.

### Polymorphic Functions

Let's take a look at a more complicated example, where we are doing more than returning a value. (Adding a depedency as a field and 
returning an actual object).

```javascript

function contractForOwnership(car, termsWithCustomer) {

    let contract = new Contract();

    switch (car.make) {
        case CarMake.HONDA:
            switch (car.model) {
                case CarModel.CIVIC:
                    contract.initialPrice = car.msrp - termsWithCustomer.discount;
                    contract.description
                    // More code to modify contract ...
                    break;
                case CarModel.CR_V:
                    // Code to modify contract ...
                    break;
                case CarModel.ACCORD:
                    // Code to modify contract ...
                    break;
                default:
                    console.log('Unknown Honda car model: ', car.model);
            }
            break;
        case CarMake.TOYOTA:
            switch (car.model) {
                case CarModel.PRIUS:
                    // Code to modify contract ...
                    break;
                case CarModel.COROLLA:
                    // Code to modify contract ...
                    break;
                case CarModel.AVALON:
                    // Code to modify contract ...
                    break;
                default:
                    console.log('Unknown Toyota car model:', car.model);
            }
            break;
        default:
            console.log('Unknown car make:', car.make);
    }

    return contract;

}

function contractForLease(car, termsWithCustomer) {
    // Return a lease contract depending on the model and make of the car 
}
```

Here we are returning a Contract object that contains all the details of the sale, including the initial price. One way to handle it is to initialize a look-up map to the corresponding functions. However, I find polymorphic functions more appropriate here.

Here's the above with polymorphic functions:

```javascript
class AccordCar extends Car {

    contractForOwnerShip(termsWithCustomer) {

    }

    contractForLease(termsWithCustomer) {

    }    

}

class CivicCar extends Car {

    contractForOwnerShip(termsWithCustomer) {

    }

    contractForLease(termsWithCustomer) {

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

function getLeaseContractForCar(car) {
    return createCar(car).contractForLease;
}

function getLeaseContractsForCars(cars) {
    return cars.map((car) => createCar(car)).map((car) => car.contractForLease());
}

```
