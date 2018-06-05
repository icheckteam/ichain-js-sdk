export default class Attribute {
  constructor(tx = {}) {
    /** @type {string} */
    this.name =  tx.name
    /** @type {number} */
    this.type = tx.type
    /** @type {byte[]} */
    this.bytes_value = tx.bytes_value
    /** @type {string} */
    this.string_value = tx.string_value
    /** @type {boolean} */
    this.boolean_value = tx.boolean_value
    /** @type {boolean} */
    this.number_value = tx.number_value
    /** @type {string[]} */
    this.enum_value = tx.enum_value
    /** @type {Location} */
    this.location_value = tx.location_value
  }
}

export class Location {
  constructor(tx = {}) {
    /** @type {number} */
    this.latitude =  tx.longitude
    /** @type {number} */
    this.longitude = tx.longitude
  }
}