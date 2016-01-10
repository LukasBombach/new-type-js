'use strict';

import Type from './core';
import TypeRange from './range';
import TypeSelection from './selection';

/**
 *
 * @param htmlString
 * @returns {Type}
 */
Type.fn.format = function(htmlString) {
  var sel = TypeSelection.fromNativeSelection(this);
  this.getFormatter().format(htmlString, sel.getRange());
  sel.select();
  return this;
};

/**
 *
 * @param el
 * @param key
 * @param value
 * @returns {*}
 */
Type.fn.data = function(el, key, value) {
  const data = el[Type.expando] = el[Type.expando] || {};
  if (key === undefined) return data;
  if (value === undefined) return data[key];
  data[key] = value;
  return this;
};
