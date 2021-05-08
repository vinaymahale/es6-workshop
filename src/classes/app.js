import {fleet} from '../fleet-data.js';
import {FleetDataService} from '../services/fleet-data-service.js';

/**
 * The main application class.
 */
export default class App {
  
  constructor() {
    this.dataService = new FleetDataService();
  }
  
  init() {
    this.initData();
    this.renderDrones();
    this.renderCars();
    this.initEvents();
    console.log('App initialized!');
  }
  
  initData() {
    this.dataService.loadData(fleet);
  }
  
  initEvents() {
    $(".search-form [type=submit]").on('click', e => {
      e.preventDefault();
      let $this = $(e.currentTarget);
      let $form = $this.closest('form');
      let searchWhat = $form.data('search');
      let q = $('[type="search"]', $form).val();
      if (q != "" && searchWhat == 'drones') {
        let drones = this.dataService.getDronesByQuery(q);
        if (drones.length) {
          $("#drone-list").empty();
          this.renderDrones(drones);
        }
      }
      else if (q == "" && searchWhat == 'drones') {
        $("#drone-list").empty();
        this.renderDrones();
      }
      else if (q != "" && searchWhat == 'cars') {
        let cars = this.dataService.getCarsByQuery(q);
        if (cars.length) {
          $("#car-list").empty();
          this.renderCars(cars);
        }
      }
      else if (q == '' && searchWhat == 'cars') {
        $("#car-list").empty();
        this.renderCars();
      }
    });
  }

  renderDrones(drones = null) {
    let template = $("#drone-template").html();
    let context = {"drones": drones === null ? this.dataService.drones : drones};
    let rendered = Mustache.render(template, context);
    $("#drone-list").html(rendered);
  }

  renderCars(cars = null) {
    let template = $("#car-template").html();
    let context = {"cars": cars === null ? this.dataService.cars : cars};
    let rendered = Mustache.render(template, context);
    $("#car-list").html(rendered);
  }
  
}