import { TEMPERATURE_UNITS } from "./units.js";

export class CityStorage {
  #key;
  #maxItems;
  #cities;

  constructor(key = "cities", maxItems = 5) {
    this.#key = key;
    this.#maxItems = maxItems;
    this.#cities = this.#load();
  }

  add(city) {
    this.#cities = this.#cities.filter((savedCity) => savedCity !== city);
    this.#cities.unshift(city);
    if (this.#cities.length > this.#maxItems) this.#cities.pop();
    this.#save();
  }

  remove(city) {
    this.#cities = this.#cities.filter((savedCity) => savedCity !== city);
    this.#save();
  }

  clear() {
    this.#cities = [];
    this.#save();
  }

  getAll() {
    return [...this.#cities];
  }

  #load() {
    try {
      const cities = JSON.parse(localStorage.getItem(this.#key));
      return Array.isArray(cities) ? cities : [];
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  #save() {
    try {
      localStorage.setItem(this.#key, JSON.stringify(this.#cities));
    } catch (error) {
      console.error(error);
    }
  }
}

export function saveTemperatureUnit(temperatureUnit) {
  try {
    localStorage.setItem("temperature_unit", temperatureUnit);
  } catch (error) {
    console.error(error);
  }
}

export function loadTemperatureUnit() {
  try {
    const unit = localStorage.getItem("temperature_unit");
    return Object.hasOwn(TEMPERATURE_UNITS, unit) ? unit : null;
  } catch (error) {
    console.error(error);
    return null;
  }
}
