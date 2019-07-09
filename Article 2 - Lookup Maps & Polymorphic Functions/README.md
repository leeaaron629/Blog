# Dealing with Deep Nested Code (Part 2)

Hi! Welcome to part 2 of Dealing with Deep Nested Code. In part 1, we went over some methods on keeping nesting to a minimum by re-structuring the code. However, we still ended up using conditionals. Today we will go over approaches that do not use conditionals at all. This way, we can truly avoid nesting inside our core logic.

### Table-Driven Methods

Table-driven methods, as the name suggests, use indexed tables (Arrays) and hash tables (HashMaps) as look-up tables to store the appropriate value or logic. The conditions are the keys and indices of the look-up table. So at run-time, the suitable logic or value can be found on the look-up table.

Let's take a look at the following code to see what table-driven methods are and can do:

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

What a mess, right? Now imagine doing all of that in one line of code. Impossible right?

```javascript
carPriceLookupMap[car1.make][car1.model][getYearKey(car1.year)];
```

Well, there it is! One line of code.

I'm kidding, here's the rest of the code:

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

Not exactly a one-liner, but the intention and logic are much more apparent than the first. Let's take an in-depth look at how this works.

The essence of this problem is classifying an object and applying the corresponding logic to it. So, in the look-up table, we use the car's properties as keys and indices. By doing this, we store the value or logic in a table instead of a decision tree, a bunch of nested if-else or switch statements. During run-time, we can easily find the correct value on the look-up table.

Here's a simpler version of the above example:

```javascript
const toyataCarModelPriceLookUpTable = {
    Prius: 25000,
    Corolla: 22000,
    Avalon: 30000
};

let priusCarPrice = toyataCarModelPriceLookUpTable['Prius'];
```

We used the car's model name as a key without any transformation. However, this is not always the case. Sometimes the key or index to use is not easily determined.

Here's a more complicated example with used cars:

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

Used cars have ranges of years, and it doesn't start at 0, which makes it very difficult to use with arrays. We can use a hash table, with the year as keys. However, we would probably have to convert the years to strings. It doesn't sound quite right for me, so I decided to use an indexed table with a helper function.

In the helper function above, we transformed the ranges of years to an index. Then we take this index and use it to determine the corresponding logic.

There are other approaches. Here's one, with a different take on the helper function:

```javascript
function getYearKeyV2(carYear) {
    return Math.max(1999, Math.min(carYear, 2010)) - 1999;
}

const usedPriusCarPriceLookUpTable = [5000, 8250, 8250, 8250, 8250, 8250, 8250, 8250, 8250, 8250, 8250, 11500];
```

Here we changed the way we key or index the table. We used an expression to determine the index, which results in values between 1999-2010, inclusive. As a result, we have to duplicate values from 2000 - 2009 and subtract 1999 for it to work. Both of these methods work excellently, and it truly depends on your situations and preferences.

In general, table-driven methods do take more space, but the gain in readability and maintainability is well worth the trade-off. The biggest challenge that comes with table-driven methods is figuring out how to key or index the table. Not every case is simple, but once figured out the rest follows.

### Polymorphic Functions

Finally, we have polymorphic functions for the scenarios where table-driven methods aren't enough. Polymorphic functions, as the name suggests, will morph according to your needs, making it a very suitable approach for dealing with conditional logic.

Let's look at an example where we create a contract to keep as a record for both parties. The contract created depends on the type of car, dealership, and terms discussed with the customer.

Here is the code with regular switch statements:

```javascript

function termToContractForOwnership(car, termsWithCustomer) {

    let contract = new Contract();

    switch (car.make) {
        case CarMake.HONDA:
            switch (car.model) {
                case CarModel.CIVIC:

                    contract.initialPrice = (car.msrp - termsWithCustomer.discount) * Dealership.CIVIC_DISCOUNT

                    if (termsWithCustomer.premiumWarrnty > 0) {
                        contract.premuiumWarranty = termsWithCustomer.premiumWarranty;
                        contract.initialPrice += termsWithCustomer.premiumWarranty * Dealership.CIVIC_PREMIUM_WARRANTY
                    } else {
                        contract.warranty = car.warranty;
                    }
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

function termToContractForLease(car, termsWithCustomer) {
    // Return a lease contract depending on the model and make of the car 
}
```

As you can see, it can get messy very quickly. The initial approach is correct not to use inheritance when a simple property with enum is sufficient. However, as the logic gets more complicated, we should start considering polymorphic functions. 

Here's the above code with polymorphic functions:

```javascript
class AccordCar extends Car {

    termToContractForOwnership(termsWithCustomer) {

        let contract = initAccordContract();

        contract.initialPrice = (car.msrp - termsWithCustomer.discount) * Dealership.ACCORD_DISCOUNT;
        contract.warranty = car.warranty;
        
        return contract;

    }

    termToContractForLease(termsWithCustomer) {

    }    

}

class CivicCar extends Car {

    termToContractForOwnership(termsWithCustomer) {

        let contract = initCivicContract();

        contract.initialPrice = (car.msrp - termsWithCustomer.discount) * Dealership.CIVIC_DISCOUNT;

        if (termsWithCustomer.premiumWarrnty > 0) {
            contract.premuiumWarranty = termsWithCustomer.premiumWarranty;
            contract.initialPrice += termsWithCustomer.premiumWarranty * Dealership.CIVIC_PREMIUM_WARRANTY;
        } else {
            contract.warranty = car.warranty;
        }

        return contract;

    }

    termToContractForLease(termsWithCustomer) {

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

The complexity is abstracted out into its respective classes and the classification in a factory method. Once classified, we can get the contract of the terms and car with a  single line of code. This code with polymorphic functions is much more straightforward and organized than the previous one.

Using polymorphic functions comes with the extra baggage of new classes. Inheritance, as well, can lead to complex code. So, we should use it sparingly. However, in this case, the complexity within our switch statements is getting out of hand. We welcome the new classes because it reduces the overall complexity. Also, if we see the same set of switch statements in other places as well, there is even more reason to consider polymorphic functions. Use polymorphic functions to reduce overall complexity.

Well, that's it! With this, I hope to see less nesting in code when dealing with complex conditional logic. Use table-driven methods, when simple values can be stored. Use polymorphic functions, when logic within is getting out of hand. Use these techniques appropriately and avoid over-use.