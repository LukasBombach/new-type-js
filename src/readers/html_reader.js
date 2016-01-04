'use strict';

import BlockNode from '../document/block_node';
import TextNode from '../document/text_node';
import Development from '../utilities/development';

export default class HtmlReader {

  /**
   *
   * @param {HTMLElement|Node} rootNode
   * @returns {DocumentNode[]}
   */
  static getDocument(rootNode) {
    return HtmlReader._getChildrenFor(rootNode);
  }

  /**
   *
   * @param domNode
   * @param attributes
   * @returns {Array}
   * @private
   */
  static _getChildrenFor(domNode, attributes = []) {

    var childNodes = [];

    Array.prototype.forEach.call(domNode.childNodes, function(node) {
      if (HtmlReader._isBlockNode(node)) childNodes.push(HtmlReader._getBlockNode(node, attributes));
      if (HtmlReader._isTextNodeWithContents(node)) childNodes.push(HtmlReader._getTextNode(node, attributes));
      if (HtmlReader._isAttributeNode(node))
        childNodes = childNodes.concat(HtmlReader._getChildrenFor(node, HtmlReader._addAttributeForNode(attributes, node)));
    });

    return childNodes;
  }

  /**
   *
   * @param domNode
   * @param attributes
   * @returns {BlockNode}
   * @private
   */
  static _getBlockNode(domNode, attributes = []) {
    var nodeType = domNode.tagName.toLowerCase();
    var children = HtmlReader._getChildrenFor(domNode, attributes);
    return new BlockNode(nodeType, children);
  }

  /**
   *
   * @param node
   * @param attributes
   * @returns {TextNode}
   * @private
   */
  static _getTextNode(node, attributes = []) {
    return new TextNode(node.nodeValue, attributes);
  }

  /**
   *
   * @param domNode
   * @returns {*|string|boolean}
   * @private
   */
  static _isBlockNode(domNode) {
    return domNode.tagName && HtmlReader._blockTags.indexOf(domNode.tagName.toLowerCase()) !== -1;
  }

  /**
   *
   * @param node
   * @returns {boolean}
   * @private
   */
  static _isTextNodeWithContents(node) {
    return node.nodeType === Node.TEXT_NODE && /[^\t\n\r ]/.test(node.textContent);
  }

  /**
   *
   * @param domNode
   * @returns {boolean}
   * @private
   */
  static _isAttributeNode(domNode) {
    var attributeMap = HtmlReader._tagAttributeMap;
    var tagName = domNode.tagName ? domNode.tagName.toLowerCase() : null;
    return !!(tagName && attributeMap[tagName]);
  }

  /**
   *
   * @param attributes
   * @param node
   * @returns {Array}
   * @private
   */
  static _addAttributeForNode(attributes = [], node) {
    var attributeMap = HtmlReader._tagAttributeMap;
    var tagName = node.tagName ? node.tagName.toLowerCase() : '';
    attributes = attributes.slice(0);
    if (attributeMap[tagName] && attributes.indexOf(tagName) === -1) attributes.push(attributeMap[tagName]);
    return attributes;
  }

  /**
   *
   * @returns {string[]}
   */
  static get _tagAttributeMap() {
    var ATTRIBUTES = TextNode.ATTRIBUTES;
    return {
      strong: ATTRIBUTES.BOLD,
      b: ATTRIBUTES.BOLD,
      em: ATTRIBUTES.ITALIC,
      i: ATTRIBUTES.ITALIC,
      u: ATTRIBUTES.UNDERLINE,
    };
  }

  /**
   *
   * @returns {string[]}
   */
  static get _blockTags() {
    return ['p', 'ul', 'ol', 'li', 'blockquote', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'div']; // todo remove div
  }

}
