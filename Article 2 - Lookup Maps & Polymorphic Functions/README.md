# Dealing with Deep Nested Code (Part 2)

Hi! Welcome to part 2 of Dealing with Deep Nested Code. If you haven't check out part 1, please do (link here).

In part 1, we went over some methods on keeping nesting to a minimum by simply re-structuring the code. However, we still ended up using conditionals. Today we will go over methods that doesn't use any conditionals at all!

Let's take a look at the following code:

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

Well there it is! One line of code. 

I'm kidding, here's the rest of the code...

```javascript
// Feel free to try this out in the browser

// The magic!
const carPriceLookupMap = {
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
console.log(carPriceLookupMap[car.make][car.model][getYearKey(car.year)]);
```

Wow! Amazing right? Now let's take a look at how this work. The essence of the problem is classifying an object and applying the appropriate logic. So, why not store the appropriate logic in an indexed or key-value table, also known as a look-up table. The key will be the object's attribute. Here's a simpler version of above:

```javascript
const toyataCarModelPriceLookUpTable = {
    Prius: 25000,
    Corolla: 22000,
    Avalon: 30000
};

let priusCarPrice = toyataCarModelPriceLookUpTable['Prius'];
```

As you can see, the car model's name is very easy to use as a key. However, this is not always the case. In the case of used cars with varying years we need the following helper function to assign a key. 

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
The array is used to hold the price of the used Prius and the helper function determines the index by the year. The tricky part of using a table-driven approach is figuring out how to key or index the table. Here's another approach:

```javascript
function getYearKeyV2(carYear) {
    return Math.max(1999, Math.min(carYear, 2010)) - 1999;
}

const usedPriusCarPriceLookUpTable = [5000, 8250, 8250, 8250, 8250, 8250, 8250, 8250, 8250, 8250, 8250, 11500];
```

Here we changed the way we keyed or index the table, or array. As a result we used an array with duplicate values instead. Both works great and it really depends on the situations and your preferences.

Table-driven methods will take more space, but the gain in readability and maintability from less nesting and code is well worth the trade-off.
