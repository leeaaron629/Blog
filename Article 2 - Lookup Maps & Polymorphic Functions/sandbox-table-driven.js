const HONDA = "Honda";
const CIVIC = "Civic";
const CR_V = "CR_V";
const ACCORD = "Accord";

const TOYOTA = "Toyota";
const PRIUS = "Prius";
const COROLLA = "Corolla";
const AVALON = "Avalon";

const carPriceLookupMap = {
    Toyota: {
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

const car1 = {
    make: HONDA,
    model: CIVIC,
    year: 1999
}

const car2 = {
    make: TOYOTA,
    model: AVALON,
    year: 2010
}

function getYearKeyV2(carYear) {
    return Math.max(1999, Math.min(carYear, 2010));
}

const carPriceLookupMapV2 = {
    Toyota: {
        Prius: {
            1999: 5000,
            2000: 8250,
            2001: 8250,
            2002: 8250,
            2003: 8250,
            2003: 8250,
            2004: 8250,
            2005: 8250,
            2006: 8250,
            2007: 8250,
            2008: 8250,
            2009: 8250,
            2010: 11500
        },
        Corolla: {
            1999: 4500,
            2000: 8000,
            2001: 8000,
            2002: 8000,
            2003: 8000,
            2003: 8000,
            2004: 8000,
            2005: 8000,
            2006: 8000,
            2007: 8000,
            2008: 8000,
            2009: 8000,
            2010: 10500
        },
        Avalon: {
            1999: 6000,
            2000: 8000,
            2001: 8000,
            2002: 8000,
            2003: 8000,
            2003: 8000,
            2004: 8000,
            2005: 8000,
            2006: 8000,
            2007: 8000,
            2008: 8000,
            2009: 8000,
            2010: 12500
        }
    },
    Honda: {
        Civic: {
            1999: 4000,
            2000: 7500,
            2001: 7500,
            2002: 7500,
            2003: 7500,
            2003: 7500,
            2004: 7500,
            2005: 7500,
            2006: 7500,
            2007: 7500,
            2008: 7500,
            2009: 7500,
            2010: 10000
        },
        CR_V: {
            1999: 6500,
            2000: 9000,
            2001: 9000,
            2002: 9000,
            2003: 9000,
            2003: 9000,
            2004: 9000,
            2005: 9000,
            2006: 9000,
            2007: 9000,
            2008: 9000,
            2009: 9000,
            2010: 12000
        },
        Accord: {
            1999: 5000,
            2000: 8000,
            2001: 8000,
            2002: 8000,
            2003: 8000,
            2003: 8000,
            2004: 8000,
            2005: 8000,
            2006: 8000,
            2007: 8000,
            2008: 8000,
            2009: 8000,
            2010: 11000
        }
    }
}

console.log(carPriceLookupMap[car1.make][car1.model][getYearKey(car1.year)]);
console.log(carPriceLookupMap[car2.make][car2.model][getYearKey(car2.year)]);
console.log(carPriceLookupMapV2[car1.make][car1.model][getYearKeyV2(car1.year)]);
console.log(carPriceLookupMapV2[car2.make][car2.model][getYearKeyV2(car2.year)]);


function getYearKey(carYear) {
    if (carYear < 2000) {
        return 0;
    } else if (carYear < 2010) {
        return 1;
    } else {
        return 2;
    }
}

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
        case TOYOTA:
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