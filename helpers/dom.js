import registry from 'dijit/registry';
import dojoArray from 'dojo/_base/array';
import query from 'dojo/query';
import 'dojo/NodeList-traverse';

function _getClassNameByMxName(elementName) {
    return ('mx-name-' + elementName).trim();
}

function _compareClass(className) {
    return widget => widget.class &&
    -1 !== widget.class.indexOf(className);
}

function _compareFriendlyId(widgetName) {
    return widget => {
        const id = widget.friendlyId.split('.').slice(-1)[ 0 ];
        return id === widgetName;
    };
}

/**
 * Find widget by class name
 *
 * @param {string} className Class of the widget
 * @returns {(Object|null)} The found widget or null
 */
export function findWidgetByClass(className) {
    const findWidget = dojoArray.filter(
        registry.toArray(),
        _compareClass(className)
    );
    return 0 === findWidget.length ? null : findWidget[ 0 ];
}

/**
 * Find widget by friendly ID name
 *
 * @param {string} widgetName Name of the widget
 * @returns {(Object|null)} The found widget or null
 */
export function findWidgetByFriendlyId(widgetName) {
    const findWidget = dojoArray.filter(
        registry.toArray(),
        _compareFriendlyId(widgetName)
    );
    return 0 === findWidget.length ? null : findWidget[ 0 ];
}

/**
 * Find widget by Mendix name
 *
 * @param {string} widgetName Name of the widget
 * @returns {(Object|null)} The found widget or null
 */
export function findWidgetByName(widgetName) {
    return findWidgetByClass(_getClassNameByMxName(widgetName));
}

/**
 * Find element by Mendix name
 *
 * @param {string} elementName Name of the element
 * @returns {(HTMLElement|null)} The found element
 */
export function findElementByName(elementName) {
    return findElement('.' + _getClassNameByMxName(elementName));
}

/**
 * Find element using dojo/query
 *
 * @param {string} cssSelector CSS Selector
 * @param {HTMLElement} [parentNode] (optional) parent node
 */
export function findElement(cssSelector, parentNode, strict = true) {
    const target = 'undefined' !== typeof parentNode && null !== parentNode ? query(cssSelector, parentNode) : query(cssSelector);
    if (strict) {
        return target && 1 === target.length ? target[ 0 ] : null;
    }
    return target && 0 < target.length ? target[ 0 ] : null;
}

/**
 *
 * @param {HTMLElement} parentNode
 * @param {HTMLElement} child
 * @returns boolean Is the child a descendant of parentNode
 */
export function isDescendant(parentNode, child) {
    let node = child.parentNode;
    while (null !== node) {
        if (node === parentNode) {
            return true;
        }
        node = node.parentNode;
    }
    return false;
}
