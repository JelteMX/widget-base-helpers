import registry from 'dijit/registry';
import dojoArray from 'dojo/_base/array';
import query from 'dojo/query';
import 'dojo/NodeList-traverse';

function _getClassNameByMxName(elementName) {
    return ('mx-name-' + elementName).trim();
}

export function findWidgetByClass(className) {
    const findWidget = dojoArray.filter(
        registry.toArray(),
        widget =>
            widget.class &&
            -1 !== widget.class.indexOf(className)
    );
    return 0 === findWidget.length ? null : findWidget[ 0 ];
}

export function findWidgetByName(widgetName) {
    return findWidgetByClass(_getClassNameByMxName(widgetName));
}

export function findElementByName(elementName) {
    return findElement('.' + _getClassNameByMxName(elementName));
}

export function findElement(cssSelector, parentNode) {
    const target = 'undefined' !== typeof parentNode ? query(cssSelector, parentNode) : query(cssSelector);
    return target && 1 === target.length ? target[ 0 ] : null;
}

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
