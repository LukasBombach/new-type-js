'use strict';

export default class Attributes  {

  constructor(attributes = []) {
    attributes = attributes instanceof Attributes ? attributes.get() : attributes;
    this.set(attributes);
  }

  /**
   *
   * @param attributes
   * @returns {Attributes}
   */
  set(attributes = []) {
    this._attributes = [];
    for (let attribute of attributes) this.add(attribute);
    return this;
  }

  /**
   * todo do not add duplicate attributes
   * @param attribute
   * @returns {Attributes}
   */
  add(attribute) {
    attribute = typeof attribute === 'string' ? [attribute, true] : attribute;
    this._attributes.push(attribute);
    return this;
  }

  /**
   * todo allow getting a specific attribute by name
   * @returns {Array}
   */
  get() {
    return this._attributes;
  }

  /**
   *
   * @returns {Number}
   */
  length() {
    return this._attributes.length;
  }

  /**
   *
   * @param attribute
   * @returns {number}
   * @private
   */
  indexOf(attribute) {
    const len = this._attributes.length;
    for (let i = 0; i < len; i++) if (Attributes._attributesAreEqual(this._attributes[i], attribute)) return i;
    return -1;
  }

  /**
   *
   * @param that
   * @returns {Attributes}
   */
  diff(that) {
    return new Attributes(this._attributes.filter(function(i) {return that.indexOf(i) < 0;}));
  }

  /**
   *
   * @param a
   * @param b
   * @returns {boolean}
   * @private
   */
  static _attributesAreEqual(a, b) {
    return a[0] == b[0] && a[1] == b[1];
  }

}
