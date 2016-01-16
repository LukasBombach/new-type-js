'use strict';

import Development from '../utilities/development';

export default class DocumentNode {

  /**
   *
   * @param {Type} type
   * @param attributes
   */
  constructor(type, attributes = []) {
    this._type = type;
    this.id = type.getUniqueId();
    this.setAttributes(attributes);
  }

  /**
   *
   * @param attributes
   * @returns {DocumentNode}
   */
  setAttributes(attributes = []) {

    this._attributes = attributes.map(function(attr) {
      return typeof attr === 'string' ? [attr,true] : attr;
    });

    return this;
  }

  /**
   *
   * @param attr
   * @returns {DocumentNode}
   */
  addAttribute(attr) {
    attr = typeof attr === 'string' ? [attr,true] : attr;
    this._attributes.push(attr);
    return this;
  }

  /**
   *
   * @returns {Array}
   */
  getAttributes() {
    return this._attributes.slice(0);
  }

}
