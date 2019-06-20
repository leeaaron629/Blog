# Dealing with Deep Nested Code (Part 2)

```javascript

function getCarPrice(car) {

    const make = car.getMake();
    const model = car.getModel();
    const year = car.getYear(); 

    let price = 0;

    switch (make) {
        case HONDA:
            switch(model) {
                case CIVIC:
                    if (year < 2000) {
                        return 4000;
                    } else if (year < 2010) {
                        return 7500;
                    } else if (year >= 2010) {
                        return 10000;
                    }
                case CR_V:
                    if (year < 2000) {
                        return 6500;
                    } else if (year < 2010) {
                        return 9000;
                    } else if (year >= 2010) {
                        return 12000;
                    }
                case ACCORD:
                    if (year < 2000) {
                        return 5000;
                    } else if (year < 2010) {
                        return 8000;
                    } else if (year >= 2010) {
                        return 11000;
                    }
                default:
                    console.log('Invalid car model: ', model);
            }
        case TOYATA:
            switch(model) {
                case PRIUS:
                    if (year < 2000) {
                        return 5000;
                    } else if (year < 2010) {
                        return 8250;
                    } else if (year >= 2010) {
                        return 11500;
                    }
                case COROLLA:
                    if (year < 2000) {
                        return 4500;
                    } else if (year < 2010) {
                        return 8000;
                    } else if (year >= 2010) {
                        return 10500;
                    }
                case AVALON:
                    if (year < 2000) {
                        return 6000;
                    } else if (year < 2010) {
                        return 9000;
                    } else if (year >= 2010) {
                        return 12500;
                    }
            }            
        default;
            console.log('Invalid car make: ', make);
    }

}


```