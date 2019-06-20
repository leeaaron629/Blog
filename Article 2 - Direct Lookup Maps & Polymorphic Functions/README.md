# Dealing with Deep Nested Code (Part 2)

```javascript

function getPrice(carRepairOrder) {

    switch (carRepairOrder.getMake()) {
        case 'Honda':
            switch(carRepairOrder.getModel()) {

            }
            break;
        case 'Toyata':
            switch(carRepairOrder.getModel()) {
                
            }            
            break;
        case 'BMW':
            switch(carRepairOrder.getModel()) {
                
            }            
            break;
        default;
            console.log('Invalid car make: ' + carRepairOrder.getMake());

    }

    // Differentiate between the make

    // Differentiate between the model

    // Differentiate between the year it was made

    // Differentiate the type of repair

}


```