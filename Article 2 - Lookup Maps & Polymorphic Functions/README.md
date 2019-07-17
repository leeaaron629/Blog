# Dealing with Deep Nested Code (Part 2)

Hi! Welcome to part 2 of Dealing with Deep Nested Code. In part 1, we went over some techniques on keeping nesting to a minimum by re-structuring the code. However, we still ended up with nesting. Today we will go over approaches that do not use if-else and switch statements. This way, we can truly avoid nesting inside our core logic.

### Table-Driven Methods

Table-driven methods, as the name suggests, use indexed tables (Arrays) and hash tables (HashMaps) as look-up tables to store the appropriate value or logic. The result of the conditions serves as keys and indices of the look-up table. So at run-time, the suitable logic or value can be found on the look-up table.

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

What a mess, right? Now imagine doing all of that in one line of code. Impossible!

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

It isn't exactly a one-liner, but there is no nesting involved! Also, intention and logic is clearer than the first.

Let's look at a simpler version of the above example to understand how it works:

```javascript
const toyataCarModelPriceLookUpTable = {
    Prius: 25000,
    Corolla: 22000,
    Avalon: 30000
};

let priusCarPrice = toyataCarModelPriceLookUpTable['Prius'];
```

We used the car's model name as a key. No transformation was necessary, but, this is not always the case. Sometimes the property is not suitable as a key or index and has to undergo some change.

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

Used cars have ranges of years, and it doesn't start at 0. These ranges make it very difficult to use with arrays. We can use a hash table, with the year as keys, but we would have to duplicate years from 2000 - 2009. It doesn't sound quite right for me, so I decided to use an indexed table with a helper function.

In the helper function above, we transformed the ranges of years to a more suitable value. Then we take this value and use it as an index to determine the corresponding value.

There are other approaches, as well. Here's a one-liner, with duplicated years and modified to use with an indexed table:

```javascript
function getYearKeyV2(carYear) {
    return Math.max(1999, Math.min(carYear, 2010)) - 1999;
}

const usedPriusCarPriceLookUpTable = [5000, 8250, 8250, 8250, 8250, 8250, 8250, 8250, 8250, 8250, 8250, 11500];
```

We used an expression to determine the index, which results in values between 1999-2010. Then, we subtract 1999 to make it work with an array. The 0th index will hold values for years below 2000. The 11th index will hold values for years above 2010. For index 1 - 10 (2000 - 2010) we will have to duplicate the values. Both of these methods works, and it truly depends on your situations and preferences.

In general, table-driven methods do take more space, but the gain in readability and maintainability is well worth the trade-off. The biggest challenge that comes with table-driven methods is figuring out how to key or index the table. Not every case is simple, but once figured out the rest follows.

### Polymorphic Functions

Lastly, we have polymorphic functions for the scenarios where table-driven methods aren't enough. Polymorphic functions, as the name suggests, will morph according to your needs, making it a very suitable approach for dealing with complex conditional logic.

Let's look at an example where we create a contract to keep as a record for both parties when buying a car from a dealership. The contract created depends on the car, dealership, and terms discussed with the customer. 

Here is the code with regular switch statements:

```javascript

function termToContractForOwnership(car, termsWithCustomer) {

    const contract = new Contract();

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
As you can see, it can get messy very quickly. The initial approach is correct not to use inheritance when a simple property with enum is sufficient. However, as requirements keep coming in and the logic gets more complicated, it is time to consider polymorphic functions.

Here's the above code with polymorphic functions:

```javascript
class AccordCar extends Car {

    termToContractForOwnership(termsWithCustomer) {

        const contract = initAccordContract();

        contract.initialPrice = (car.msrp - termsWithCustomer.discount) * Dealership.ACCORD_DISCOUNT;
        contract.warranty = car.warranty;
        
        return contract;

    }

    termToContractForLease(termsWithCustomer) {
        // Complex code to create a lease, specific to Accords
    }    

}

class CivicCar extends Car {

    termToContractForOwnership(termsWithCustomer) {

        const contract = initCivicContract();

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
        // Complex code to create a lease, specific to Civics
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

The code is not shorter, but it is much more straightforward and organized. We abstracted out the complexity into its respective class and the classification in a factory method. As a result, the primary logic is only a single line of code. Overall, it is slightly more verbose. However, with switch statements elsewhere and the complex logic organized in its respective class, it is easier to reason with, read, and maintain.

Using polymorphic functions does come with extra baggage. There are new classes to consider, and inheritance can lead to complex code. We should use it accordingly. However, in this case, the complexity within our switch statements is getting out of hand. So, we welcome the new classes because it reduces the overall complexity. Also, if we see the same set of switch statements elsewhere, there is even more reason to consider polymorphic functions. Use polymorphic functions to reduce overall complexity, not to increase it.

Well, that's it! With these techniques, I hope you can turn some nasty switch-statements into look-up tables or add more structure with polymorphic functions. As always, do not misuse these techniques. Use them accordingly.
