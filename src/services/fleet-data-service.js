/**
 * Manage cars and drones data.
*/

import {Car} from '../classes/car.js';
import {Drone} from '../classes/drone.js';

export class FleetDataService {
  
  constructor() {
    this.drones = [];
    this.cars = [];
  }
  
  loadData(fleet) {
    for (let item of fleet) {
      switch (item.type) {
        case 'drone':
          let d = this.loadDrone(item);
          this.drones.push(d);
          break;
        case 'car':
          let c = this.loadCar(item)
          this.cars.push(c);
          break;
      }
    }
  }
  
  loadCar(item) {
    let c = new Car(item.license, item.model, item.latLng);
    c.make = item.make;
    c.miles = item.miles;
    return c;
  }
  
  loadDrone(item) {
    let d = new Drone(item.license, item.model, item.latLng);
    d.airTimeHours = item.airTimeHours;
    d.base = item.base;
    return d;
  }
  
  getCarByLicense(license) {
    return this.cars.find(car => car.license === license);
  }
  
  getCarsSortedByLicense() {
    return this.cars.sort( ({license: lic1}, {license: lic2}) => lic1 < lic2 ? -1 : (lic1 > lic2 ? 1 : 0) );
  }
  
  getCarsByQuery(q) {
    let carResults =  this.cars.filter(obj =>
      obj.license.toLowerCase().indexOf(q.toLowerCase()) >= 0);
    if(!carResults.length){
      carResults = this.getCarsByModel(q);
    }
    if(!carResults.length){
      carResults = this.getCarsByMake(q);
    }
    // this.cars.filter(car => car.license.indexOf(q) !== -1);
    return carResults;
  }

  getCarsByModel(q) {
    return this.cars.filter(obj =>
      obj.model.toLowerCase().indexOf(q.toLowerCase()) >= 0);
  }

  getCarsByMake(q) {
    return this.cars.filter(obj =>
      obj.make.toLowerCase().indexOf(q.toLowerCase()) >= 0);
  }
  
  getDronesByQuery(q) {
    let droneResults = this.drones.filter(obj =>
      obj.license.toLowerCase().indexOf(q.toLowerCase()) >= 0);
      if(!droneResults.length){
        droneResults = this.drones.filter(obj =>
          obj.model.toLowerCase().indexOf(q.toLowerCase()) >= 0);
      }
    return droneResults;
  }
  
}
