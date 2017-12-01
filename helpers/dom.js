import registry from 'dijit/registry';
import dojoArray from 'dojo/_base/array';

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
    const className = `mx-name-${widgetName}`.trim();
    return findWidgetByClass(className);
}
