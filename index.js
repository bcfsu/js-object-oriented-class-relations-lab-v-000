let store = { drivers: [], passengers: [], trips: [] };
let id = 0;

class Driver {
  constructor(name) {
    this.name = name;
    this.id = ++id;
    store.drivers.push(this);
  }

  trips() {
    return store.trips.filter(
      function(trip) {
        return trip.driverId === this.id;
      }.bind(this)
    );
  }

  passengers() {
    return this.trips().map(trip => {
      return trip.passenger();
    });
  }
}

class Passenger {
  constructor(name) {
    this.name = name;
    this.id = ++id;
    store.passengers.push(this);
  }

  trips() {
    return store.trips.filter(
      function(trip) {
        return trip.passengerId === this.id;
      }.bind(this)
    );
  }

  drivers() {
    return this.trips().map(trip => {
      return trip.driver();
    });
  }
}

class Trip {
  constructor(driver, passenger) {
    this.id = ++id;
    store.trips.push(this);
    this.driverId = driver.id;
    this.passengerId = passenger.id;
  }

  passenger() {
    return store.passengers.find(
      function(passenger) {
        return passenger.id === this.passengerId;
      }.bind(this)
    );
  }

  driver() {
    return store.drivers.find(
      function(driver) {
        return driver.id === this.driverId;
      }.bind(this)
    );
  }
}
