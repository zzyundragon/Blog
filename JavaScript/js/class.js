class Vehicle {
    engines = 1
    ignition() {
        console.log('truning on my engine')
    }
    drive() {
        this.ignition()
        console.log('Steering and moving forward')
    }
}

class Car extends Vehicle {
    constructor() {
        super()
        this.wheels = 4
    }
    info() {
        // inherited: drive()
        console.log('rolling on all', this.wheels, ' wheels')
        return this
    }
}

let car = new Car()
car.info().drive()